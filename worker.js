// EP × Beko Sales Challenge – Zeitplan für Wochen- und Monatsmail
// Im Cloudflare-Dashboard als eigener Worker anlegen, diesen Code einfügen, „Deploy“.
// Variablen (Einstellungen → Variablen und Geheimnisse):
//   APP_URL   = https://ep-beko-challenge.pages.dev   (Adresse der App)
//   CRON_KEY  = derselbe geheime Wert wie im Pages-Projekt (Typ „Secret“)
// Trigger (Einstellungen → Trigger → Cron): 0 * * * 5   (stündlich am Freitag; die App versendet nur einmal ab der eingestellten Uhrzeit)
export default {
  async scheduled(event, env, ctx) { ctx.waitUntil(run(env)); },
  async fetch(request, env) {
    return new Response("EP × Beko Mail-Zeitplan ist aktiv. Versand erfolgt freitags automatisch.", { headers: { "content-type": "text/plain; charset=utf-8" } });
  }
};
async function run(env) {
  if (!env.APP_URL || !env.CRON_KEY) { console.log("APP_URL oder CRON_KEY fehlt"); return; }
  const r = await fetch(env.APP_URL.replace(/\/+$/, "") + "/api/mail/run", { method: "POST", headers: { "x-cron-key": env.CRON_KEY } });
  console.log("Mail-Lauf:", r.status, await r.text());
}
