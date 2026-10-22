#!/usr/bin/env bash
# Legt D1-Datenbank, KV-Namespace und Pages-Projekt an, falls sie fehlen (vorhandene werden weiterverwendet),
# und schreibt daraus wrangler.toml (App) und mailer/wrangler.toml (Zeitplan-Worker).
set -euo pipefail
: "${CLOUDFLARE_API_TOKEN:?fehlt}"; : "${CLOUDFLARE_ACCOUNT_ID:?fehlt}"
PROJECT="${PAGES_PROJECT:-ep-beko-challenge}"
D1_NAME="${D1_NAME:-ep-beko-challenge}"
KV_TITLE="${KV_TITLE:-ep-beko-files}"
API="${CF_API_BASE:-https://api.cloudflare.com/client/v4}/accounts/${CLOUDFLARE_ACCOUNT_ID}"
H=(-H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" -H "Content-Type: application/json")
cf() { curl -sS "${H[@]}" "$@"; }
need_ok() { echo "$1" | jq -e '.success == true' >/dev/null || { echo "Cloudflare-API-Fehler: $(echo "$1" | jq -c '.errors')" >&2; exit 1; }; }

# D1
R=$(cf "${API}/d1/database?name=${D1_NAME}"); need_ok "$R"
D1_ID=$(echo "$R" | jq -r --arg n "$D1_NAME" '.result[] | select(.name==$n) | .uuid' | head -n1)
if [ -z "$D1_ID" ]; then
  R=$(cf -X POST "${API}/d1/database" --data "$(jq -nc --arg n "$D1_NAME" '{name:$n}')"); need_ok "$R"
  D1_ID=$(echo "$R" | jq -r '.result.uuid'); echo "D1 angelegt: ${D1_NAME} (${D1_ID})"
else echo "D1 vorhanden: ${D1_NAME} (${D1_ID})"; fi

# KV
KV_ID=""; PAGE=1
while [ -z "$KV_ID" ]; do
  R=$(cf "${API}/storage/kv/namespaces?per_page=100&page=${PAGE}"); need_ok "$R"
  KV_ID=$(echo "$R" | jq -r --arg t "$KV_TITLE" '.result[] | select(.title==$t) | .id' | head -n1)
  [ "$(echo "$R" | jq '.result | length')" -lt 100 ] && break; PAGE=$((PAGE+1))
done
if [ -z "$KV_ID" ]; then
  R=$(cf -X POST "${API}/storage/kv/namespaces" --data "$(jq -nc --arg t "$KV_TITLE" '{title:$t}')"); need_ok "$R"
  KV_ID=$(echo "$R" | jq -r '.result.id'); echo "KV angelegt: ${KV_TITLE} (${KV_ID})"
else echo "KV vorhanden: ${KV_TITLE} (${KV_ID})"; fi

# Pages-Projekt
R=$(cf "${API}/pages/projects/${PROJECT}")
if echo "$R" | jq -e '.success == true' >/dev/null; then echo "Pages-Projekt vorhanden: ${PROJECT}"
else
  R=$(cf -X POST "${API}/pages/projects" --data "$(jq -nc --arg n "$PROJECT" '{name:$n, production_branch:"main"}')"); need_ok "$R"
  echo "Pages-Projekt angelegt: ${PROJECT}"
fi

APP_URL="${APP_URL:-https://${PROJECT}.pages.dev}"
toml_str() { printf '"%s"' "$(printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g')"; }

{
  echo "# automatisch erzeugt von scripts/ensure-resources.sh – nicht von Hand bearbeiten"
  echo "name = $(toml_str "$PROJECT")"
  echo 'pages_build_output_dir = "./public"'
  echo 'compatibility_date = "2025-09-01"'
  echo
  echo "[vars]"
  echo "APP_URL = $(toml_str "$APP_URL")"
  echo "CF_ACCOUNT_ID = $(toml_str "$CLOUDFLARE_ACCOUNT_ID")"
  [ -n "${ADMIN_EMAILS:-}" ] && echo "ADMIN_EMAILS = $(toml_str "$ADMIN_EMAILS")"
  [ -n "${MAIL_FROM:-}" ] && echo "MAIL_FROM = $(toml_str "$MAIL_FROM")"
  echo
  echo "[[d1_databases]]"
  echo 'binding = "DB"'
  echo "database_name = $(toml_str "$D1_NAME")"
  echo "database_id = $(toml_str "$D1_ID")"
  echo
  echo "[[kv_namespaces]]"
  echo 'binding = "FILES"'
  echo "id = $(toml_str "$KV_ID")"
} > wrangler.toml

{
  echo "# automatisch erzeugt von scripts/ensure-resources.sh"
  echo 'name = "ep-beko-mail-zeitplan"'
  echo 'main = "worker.js"'
  echo 'compatibility_date = "2025-09-01"'
  echo
  echo "[triggers]"
  echo 'crons = ["0 * * * 5"]'
  echo
  echo "[vars]"
  echo "APP_URL = $(toml_str "$APP_URL")"
} > mailer/wrangler.toml

echo "APP_URL=${APP_URL}" >> "${GITHUB_OUTPUT:-/dev/null}"
echo "Konfiguration geschrieben: wrangler.toml, mailer/wrangler.toml"
