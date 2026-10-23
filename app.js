// EP × Beko Sales Challenge – Cloudflare Worker mit statischen Dateien (public/)
// Bindings aus wrangler.jsonc: DB (D1), FILES (KV), ASSETS (public/). Variablen (optional): ADMIN_EMAILS, START_PASSWORD. Mail: MAIL_FROM, CF_ACCOUNT_ID, CF_API_TOKEN, CRON_KEY, APP_URL.
// Anmeldung: E-Mail aus „Mitglieder & E-Mails“ + Passwort. Ohne Anmeldung ist nichts erreichbar.
const SEED = [{"path": "config/members", "coll": "config", "data": "{\"members\":[{\"email\":\"jhohenegger@electronicpartner.at\",\"name\":\"J. P. Hohenegger\",\"role\":\"ost\"},{\"email\":\"gerald.kastner@beko.com\",\"name\":\"G. Kastner\",\"role\":\"ost\"},{\"email\":\"andreas.pfeiffer@beko.com\",\"name\":\"A. Pfeiffer\",\"role\":\"ost\"},{\"email\":\"etheuermann@electronicpartner.at\",\"name\":\"E. Theuermann\",\"role\":\"sued\"},{\"email\":\"wolfgang.tscherner@beko.com\",\"name\":\"W. Tscherner\",\"role\":\"sued\"},{\"email\":\"tneubauer@electronicpartner.at\",\"name\":\"T. Neubauer\",\"role\":\"nord\"},{\"email\":\"helmut.schmidler@beko.com\",\"name\":\"H. Schmidler\",\"role\":\"nord\"},{\"email\":\"gmoser@electronicpartner.com\",\"name\":\"G. Moser\",\"role\":\"west\"},{\"email\":\"helmut.schmidler@beko.com\",\"name\":\"H. Schmidler\",\"role\":\"west\"},{\"email\":\"mhofer@electronicpartner.com\",\"name\":\"M. Hofer\",\"role\":\"trainer\"},{\"email\":\"harald.kasperowski@beko.com\",\"name\":\"H. Kasperowski\",\"role\":\"trainer\"},{\"email\":\"wolfgang.stelzer@beko.com\",\"name\":\"W. Stelzer\",\"role\":\"cotrainer\"},{\"email\":\"ckeberle@electronicpartner.at\",\"name\":\"C. Keberle\",\"role\":\"cotrainer\"},{\"email\":\"hschiefer@electronicpartner.at\",\"name\":\"H. Schiefer\",\"role\":\"cotrainer\"},{\"email\":\"wleutner@electronicpartner.at\",\"name\":\"W. Leutner\",\"role\":\"mental\"},{\"email\":\"margit.anglmaier@beko.com\",\"name\":\"M. Anglmaier\",\"role\":\"mental\"}],\"updated\":\"2026-10-22T13:20:00.000Z\"}"}, {"path": "plans/nord", "coll": "plans", "data": "{\"imported\":\"2026-10-20T18:54:22.058Z\",\"partners\":[{\"bl\":\"Salzburg\",\"name\":\"Electromax GmbH\",\"ort\":\"Saalfelden\",\"rang\":12},{\"bl\":\"Oberösterreich\",\"name\":\"ANDREAS MITTERHUEMER e.U.\",\"neukunde\":\"nein\",\"ort\":\"Steyr\",\"rang\":13,\"umsatz\":150000},{\"bl\":\"Oberösterreich\",\"name\":\"EP SCHRATTENECKER\",\"ort\":\"Gaspoltshofen\",\"rang\":64},{\"bl\":\"Oberösterreich\",\"name\":\"Josef Silber e.U.\",\"neukunde\":\"ja\",\"ort\":\"Wels\",\"rang\":70,\"umsatz\":20000},{\"bl\":\"Oberösterreich\",\"name\":\"KICKINGER MARKUS\",\"ort\":\"Vorchdorf\",\"rang\":75},{\"bl\":\"Oberösterreich\",\"name\":\"LEHNER STEFAN\",\"neukunde\":\"ja\",\"ort\":\"Schönau\",\"rang\":78,\"umsatz\":10000},{\"bl\":\"Oberösterreich\",\"name\":\"STRASSER-MARKT\",\"neukunde\":\"ja\",\"ort\":\"Perg\",\"rang\":113,\"umsatz\":20000},{\"bl\":\"Oberösterreich\",\"dan\":\"ja\",\"name\":\"Birgit Kuntner\",\"neukunde\":\"nein\",\"ort\":\"Regau\",\"rang\":117,\"umsatz\":20000},{\"bl\":\"Oberösterreich\",\"name\":\"Johann Gahleitner\",\"ort\":\"Neufelden\",\"rang\":134},{\"bl\":\"Oberösterreich\",\"name\":\"WOLFESBERGER GMBH\",\"ort\":\"Alkoven\",\"rang\":173},{\"bl\":\"Oberösterreich\",\"name\":\"GREINÖCKER & WILLIBALD\",\"neukunde\":\"ja\",\"ort\":\"Vöcklamarkt\",\"rang\":220,\"umsatz\":10000},{\"bl\":\"Oberösterreich\",\"name\":\"KERBL  ELEKTRO GMBH.\",\"ort\":\"Reichraming\",\"rang\":243},{\"bl\":\"Oberösterreich\",\"name\":\"ELEKTRO HAAS GMBH\",\"ort\":\"Brunnenthal/Schärding\",\"rang\":245},{\"bl\":\"Oberösterreich\",\"name\":\"MITTERMAYR ALEXANDER\",\"neukunde\":\"ja\",\"ort\":\"Linz\",\"rang\":269,\"umsatz\":10000},{\"bl\":\"Oberösterreich\",\"name\":\"Elektro Payrhuber Installations-\",\"ort\":\"Vorchdorf\",\"rang\":319},{\"bl\":\"Oberösterreich\",\"name\":\"ROCKENSCHAUB KG\",\"ort\":\"Katsdorf\",\"rang\":356},{\"bl\":\"Salzburg\",\"name\":\"SWOBODA WALTER\",\"ort\":\"Lofer\",\"rang\":405},{\"bl\":\"Oberösterreich\",\"name\":\"SIGL PATRICK\",\"ort\":\"Ternberg\"}],\"source\":\"EP_Gebiets-Challenge_Regionsplan.xlsx\"}"}, {"path": "plans/ost", "coll": "plans", "data": "{\"imported\":\"2026-10-20T18:54:22.054Z\",\"partners\":[{\"bl\":\"Niederösterreich\",\"name\":\"ELECTRONIC PARTNER\",\"ort\":\"Baden\"},{\"bl\":\"Wien\",\"name\":\"ELEKTRO SHOP KÖCK GMBH\",\"ort\":\"Wien\",\"rang\":1},{\"bl\":\"Wien\",\"name\":\"AKATRONIK GMBH\",\"ort\":\"Wien\",\"rang\":2},{\"bl\":\"Wien\",\"name\":\"0815 ONLINE HANDEL GMBH\",\"ort\":\"Wien\",\"rang\":4},{\"bl\":\"Niederösterreich\",\"name\":\"ELEKTRO ZIERLINGER GMBH\",\"ort\":\"Gföhl\",\"rang\":14},{\"bl\":\"Niederösterreich\",\"name\":\"EVS TEAM HANDELS GMBH\",\"neukunde\":\"ja\",\"ort\":\"Krems\",\"rang\":18,\"service\":\"Ja hätte Interesse\",\"umsatz\":1500},{\"bl\":\"Niederösterreich\",\"name\":\"AMASHAUFER ERICH  GMBH\",\"neukunde\":\"nein\",\"ort\":\"Pöchlarn\",\"rang\":20,\"umsatz\":8000},{\"bl\":\"Wien\",\"name\":\"ELECTRO TREFF GMBH.\",\"ort\":\"Wien\",\"rang\":21},{\"bl\":\"Niederösterreich\",\"name\":\"APPEL GES.M.B.H.\",\"ort\":\"Vitis\",\"rang\":31},{\"bl\":\"Niederösterreich\",\"name\":\"Hienert Büro Technik\",\"ort\":\"Wilfersdorf\",\"rang\":39},{\"bl\":\"Niederösterreich\",\"name\":\"SP ELEKTRO SCHADNER e.U.\",\"neukunde\":\"nein\",\"ort\":\"Kilb\",\"rang\":42,\"umsatz\":3000},{\"bl\":\"Niederösterreich\",\"name\":\"HAUSTECHNIK HOCHRIEDER GMBH\",\"ort\":\"Sieghartskirchen\",\"rang\":45},{\"bl\":\"Niederösterreich\",\"name\":\"ELEKTRO WÖHRER GMBH\",\"neukunde\":\"nein\",\"ort\":\"Leobersdorf\",\"rang\":58,\"umsatz\":15000},{\"bl\":\"Niederösterreich\",\"name\":\"WEJDA  GMBH\",\"ort\":\"Heiligeneich\",\"rang\":87},{\"bl\":\"Niederösterreich\",\"name\":\"GRUBER HELMUT\",\"neukunde\":\"nein\",\"ort\":\"Ternitz\",\"rang\":91,\"umsatz\":10000},{\"bl\":\"Niederösterreich\",\"name\":\"KLAFFL EDUARD\",\"ort\":\"Hainburg\",\"rang\":92},{\"bl\":\"Niederösterreich\",\"name\":\"LUDWIG JIRICEK GesmbH\",\"neukunde\":\"nein\",\"ort\":\"Guntramsdorf\",\"rang\":97,\"umsatz\":2500},{\"bl\":\"Wien\",\"name\":\"J. u. M. KUCHLING GMBH\",\"ort\":\"Wien\",\"rang\":104},{\"bl\":\"Niederösterreich\",\"name\":\"HOFSTÄTTER ING.GMBH\",\"ort\":\"St. Peter/Au\",\"rang\":109},{\"bl\":\"Niederösterreich\",\"name\":\"ELEKTRO FUCHS GMBH\",\"neukunde\":\"nein\",\"ort\":\"Ober-Grafendorf\",\"rang\":240,\"service\":\"Ja hat Interesse\",\"umsatz\":6000},{\"bl\":\"Burgenland\",\"name\":\"ELEKTRO LEHRNER GMBH\",\"neukunde\":\"nein\",\"ort\":\"Horitschon\",\"rang\":118,\"umsatz\":13000},{\"bl\":\"Burgenland\",\"name\":\"LEHRNER GMBH\",\"ort\":\"Horitschon\",\"rang\":118},{\"bl\":\"Niederösterreich\",\"name\":\"ELEKTROHAUS\",\"neukunde\":\"nein\",\"ort\":\"Wilhelmsburg\",\"rang\":147,\"umsatz\":1000},{\"bl\":\"Burgenland\",\"name\":\"Ing. Gartner Franz e.U.\",\"ort\":\"Illmitz\",\"rang\":155},{\"bl\":\"Niederösterreich\",\"name\":\"GÜNTHER KOBER\",\"ort\":\"Pulkau\",\"rang\":174},{\"bl\":\"Niederösterreich\",\"name\":\"ELEKTRO MORSCHER GMBH\",\"ort\":\"Waidhofen/Thaya\",\"rang\":192},{\"bl\":\"Niederösterreich\",\"name\":\"KOLAR ANDREAS & SOHN GMBH\",\"ort\":\"Kirchberg/Wagram\",\"rang\":195},{\"bl\":\"Niederösterreich\",\"name\":\"PT SOLUTION e.U\",\"ort\":\"Obersiebenbrunn\",\"rang\":205},{\"bl\":\"Burgenland\",\"name\":\"HAUSTECHNIK GÜSSING GMBH\",\"neukunde\":\"nein\",\"ort\":\"Güssing\",\"rang\":217,\"umsatz\":1500},{\"bl\":\"Niederösterreich\",\"name\":\"ELEKTRO-BLAZEK & PARTNER\",\"ort\":\"Drosendorf\",\"rang\":219},{\"bl\":\"Niederösterreich\",\"name\":\"ELEKTRO SPONNER HARALD e.U.\",\"ort\":\"Hadres\",\"rang\":223},{\"bl\":\"Niederösterreich\",\"name\":\"AUDIO EXKLUSIV GMBH\",\"ort\":\"Stockerau\",\"rang\":237},{\"bl\":\"Niederösterreich\",\"name\":\"EPS ELECTRIC POWER SYSTEMS GMBH\",\"ort\":\"Maria Anzbach\",\"rang\":256},{\"bl\":\"Niederösterreich\",\"name\":\"Elektrohandel Steiner Ursula\",\"neukunde\":\"nein\",\"ort\":\"Gaming\",\"rang\":281,\"umsatz\":2000},{\"bl\":\"Burgenland\",\"name\":\"SCHLÜNKEN\",\"neukunde\":\"nein\",\"ort\":\"Pöttsching\",\"rang\":292,\"umsatz\":2000},{\"bl\":\"Niederösterreich\",\"name\":\"ING. W. VLASTA Gesellschaft m.b.H.\",\"neukunde\":\"nein\",\"ort\":\"Ebreichsdorf\",\"rang\":309,\"umsatz\":1500},{\"bl\":\"Niederösterreich\",\"name\":\"GOBEC GESMBH & CO KG\",\"ort\":\"Pöchlarn\",\"rang\":383},{\"bl\":\"Niederösterreich\",\"name\":\"LUEF MICHAEL\",\"ort\":\"Bad Erlach\",\"rang\":440,\"umsatzNote\":\"Pension\"},{\"bl\":\"Niederösterreich\",\"name\":\"LINDNER FLORIAN\",\"neukunde\":\"nein\",\"ort\":\"Ybbs a.d.Donau\",\"rang\":447,\"umsatz\":1500},{\"bl\":\"Niederösterreich\",\"name\":\"Elektro Peter Meindl GmbH\",\"ort\":\"Schrems\",\"rang\":470},{\"bl\":\"Niederösterreich\",\"name\":\"INH. HARALD BRANDSTETTER\",\"ort\":\"Böheimkirchen\"},{\"bl\":\"Niederösterreich\",\"name\":\"JANDA ANLAGENBAU GMBH\",\"ort\":\"Herzogenburg\"},{\"bl\":\"Wien\",\"name\":\"TSF TECHNISCHES SERVICE GMBH\",\"ort\":\"Wien\"}],\"source\":\"EP_Gebiets-Challenge_Regionsplan.xlsx\"}"}, {"path": "plans/sued", "coll": "plans", "data": "{\"imported\":\"2026-10-20T18:54:22.057Z\",\"partners\":[{\"bl\":\"Kärnten\",\"name\":\"Hus Electronic & Service GmbH & Co\",\"neukunde\":\"nein\",\"ort\":\"Völkermarkt\",\"rang\":8,\"umsatz\":70000},{\"bl\":\"Steiermark\",\"name\":\"ET KÖNIG GMBH\",\"neukunde\":\"nein\",\"ort\":\"Scheifling\",\"rang\":9,\"umsatz\":50000},{\"bl\":\"Steiermark\",\"name\":\"STIBITZHOFER GES.M.B.H.\",\"neukunde\":\"nein\",\"ort\":\"Kalsdorf\",\"rang\":22,\"umsatz\":15000},{\"bl\":\"Steiermark\",\"name\":\"STADTWERKE VOITSBERG GMBH\",\"neukunde\":\"nein\",\"ort\":\"Voitsberg\",\"rang\":24,\"umsatz\":5000},{\"bl\":\"Steiermark\",\"name\":\"LICHT-LOIDL GMBH\",\"neukunde\":\"nein\",\"ort\":\"Lafnitz\",\"rang\":25,\"umsatz\":6000},{\"bl\":\"Steiermark\",\"name\":\"THEUSSL GMBH\",\"neukunde\":\"nein\",\"ort\":\"Deutschlandsberg\",\"rang\":29,\"umsatz\":3000},{\"bl\":\"Kärnten\",\"name\":\"ELEKTRO SCHULLER GMBH\",\"neukunde\":\"ja\",\"ort\":\"Hermagor\",\"rang\":30,\"umsatz\":2000},{\"bl\":\"Steiermark\",\"name\":\"STADTWERKE MÜRZZUSCHLAG\",\"neukunde\":\"nein\",\"ort\":\"Mürzzuschlag\",\"rang\":34,\"umsatz\":15000},{\"bl\":\"Kärnten\",\"name\":\"ELEKTRO PAJNIK GmbH\",\"neukunde\":\"nein\",\"ort\":\"Sankt Paul\",\"rang\":51,\"umsatz\":20000},{\"bl\":\"Steiermark\",\"name\":\"STESSL ROLAND KG\",\"neukunde\":\"nein\",\"ort\":\"Fürstenfeld\",\"rang\":68,\"umsatz\":4000},{\"bl\":\"Steiermark\",\"name\":\"MURAUER STADTWERKE\",\"neukunde\":\"nein\",\"ort\":\"Murau\",\"rang\":72,\"umsatz\":4000},{\"bl\":\"Steiermark\",\"name\":\"ELEKTRO RAMERT GMBH\",\"neukunde\":\"nein\",\"ort\":\"Feldbach\",\"rang\":73,\"umsatz\":10000},{\"bl\":\"Steiermark\",\"name\":\"Hanspeter Reinhard Almer\",\"neukunde\":\"ja\",\"ort\":\"St. Margarethen/Raab\",\"rang\":74,\"umsatz\":2000},{\"bl\":\"Steiermark\",\"name\":\"ING. STEFAN ROBIER\",\"neukunde\":\"nein\",\"ort\":\"Leibnitz\",\"rang\":77,\"umsatz\":12000},{\"bl\":\"Steiermark\",\"name\":\"LABLER ERICH\",\"neukunde\":\"nein\",\"ort\":\"Leoben\",\"rang\":84,\"umsatz\":5000},{\"bl\":\"Steiermark\",\"name\":\"ELEKTROTECHNIK HOCHEGGER GMBH\",\"neukunde\":\"nein\",\"ort\":\"Graz\",\"rang\":86,\"umsatz\":25000},{\"bl\":\"Kärnten\",\"name\":\"Elektro Hohenwarter GmbH\",\"neukunde\":\"nein\",\"ort\":\"Kötschach\",\"rang\":94,\"umsatz\":4000},{\"bl\":\"Steiermark\",\"name\":\"FEISTRITZTHALER E-WERK egen\",\"neukunde\":\"nein\",\"ort\":\"Großwilfersdorf\",\"rang\":105,\"umsatz\":7000},{\"bl\":\"Steiermark\",\"name\":\"ET Unterwieser Gmbh\",\"neukunde\":\"nein\",\"ort\":\"Friedberg\",\"rang\":110,\"umsatz\":4000},{\"bl\":\"Steiermark\",\"name\":\"KOKOL EWALD\",\"neukunde\":\"ja\",\"ort\":\"Strass\",\"rang\":121,\"umsatz\":2000},{\"bl\":\"Steiermark\",\"name\":\"STADTWERKE BRUCK A. D.MUR GMBH\",\"neukunde\":\"nein\",\"ort\":\"Bruck/Mur\",\"rang\":122,\"umsatz\":4000},{\"bl\":\"Steiermark\",\"name\":\"ELEKTRO BRAND GMBH\",\"neukunde\":\"ja\",\"ort\":\"Gleisdorf\",\"rang\":125,\"umsatz\":2000},{\"bl\":\"Steiermark\",\"name\":\"RAPPOLD GMBH & CO.KG\",\"neukunde\":\"nein\",\"ort\":\"Riegersburg\",\"rang\":129,\"umsatz\":2000},{\"bl\":\"Steiermark\",\"name\":\"ELEKTRO BRAUN GMBH\",\"neukunde\":\"nein\",\"ort\":\"Ilz\",\"rang\":131,\"umsatz\":14000},{\"bl\":\"Kärnten\",\"name\":\"BARTH OHG\",\"neukunde\":\"nein\",\"ort\":\"Heiligenblut\",\"rang\":142,\"umsatz\":5000},{\"bl\":\"Kärnten\",\"name\":\"PIRKER WOLFGANG e.U.\",\"neukunde\":\"ja\",\"ort\":\"Gmünd\",\"rang\":148,\"umsatz\":2000},{\"bl\":\"Steiermark\",\"name\":\"ELEKTRO PESCHEL GMBH\",\"neukunde\":\"nein\",\"ort\":\"Obdach\",\"rang\":157,\"umsatz\":10000},{\"bl\":\"Kärnten\",\"name\":\"HARTLIEB GMBH\",\"neukunde\":\"nein\",\"ort\":\"Steinfeld\",\"rang\":159,\"umsatz\":4000},{\"bl\":\"Steiermark\",\"name\":\"KOKOL GES.M.B.H. & CO KG\",\"neukunde\":\"nein\",\"ort\":\"Wolfsberg\",\"rang\":161,\"umsatz\":12000},{\"bl\":\"Steiermark\",\"name\":\"ELEKTRO LAFER GMBH\",\"neukunde\":\"nein\",\"ort\":\"Mureck\",\"rang\":196,\"umsatz\":10000},{\"bl\":\"Steiermark\",\"name\":\"Alois Wallner GmbH\",\"neukunde\":\"nein\",\"ort\":\"Deutschlandsberg\",\"rang\":242,\"umsatz\":2000},{\"bl\":\"Steiermark\",\"name\":\"MARINITSCH ALEXANDER\",\"ort\":\"St. Michael\",\"rang\":279,\"umsatz\":0},{\"bl\":\"Steiermark\",\"name\":\"ELEKTRO JÖLLER GMBH\",\"neukunde\":\"nein\",\"ort\":\"Frohnleiten\",\"rang\":283,\"umsatz\":5000},{\"bl\":\"Steiermark\",\"name\":\"HITZIGER GMBH & CO KG\",\"ort\":\"Frohnleiten\",\"rang\":289,\"umsatz\":0},{\"bl\":\"Steiermark\",\"name\":\"ELEKTRO THUM OG\",\"ort\":\"Knittelfeld\",\"rang\":290,\"umsatz\":0},{\"bl\":\"Steiermark\",\"name\":\"Müller-Gaich GmbH\",\"neukunde\":\"nein\",\"ort\":\"Stainz\",\"rang\":291,\"umsatz\":5000},{\"bl\":\"Steiermark\",\"name\":\"STADTWERKE JUDENBURG AG\",\"neukunde\":\"nein\",\"ort\":\"Judenburg\",\"rang\":310,\"umsatz\":4000},{\"bl\":\"Steiermark\",\"name\":\"ELEKTRO FLADISCHER GMBH\",\"neukunde\":\"nein\",\"ort\":\"Thörl\",\"rang\":388,\"umsatz\":3000},{\"bl\":\"Steiermark\",\"name\":\"REINDL EMANUEL FRANZ e.U.\",\"neukunde\":\"nein\",\"ort\":\"Feldbach\",\"umsatz\":15000},{\"bl\":\"Kärnten\",\"name\":\"DANIEL ELECTRONIC\",\"neukunde\":\"nein\",\"ort\":\"Ebernstein\",\"umsatz\":2000},{\"bl\":\"Steiermark\",\"dan\":\"nein\",\"name\":\"POSOD MARKUS\",\"neukunde\":\"ja\",\"ort\":\"Leutschach\",\"pos\":\"ja\",\"umsatz\":2000},{\"bl\":\"Steiermark\",\"name\":\"Schreck\",\"neukunde\":\"ja\",\"ort\":\"Thannhausen\",\"pos\":\"ja\",\"umsatz\":10000},{\"bl\":\"Steiermark\",\"name\":\"Marko\",\"neukunde\":\"nein\",\"ort\":\"Graz\",\"umsatz\":30000},{\"bl\":\"Steiermark\",\"name\":\"Rainer\",\"neukunde\":\"nein\",\"ort\":\"Deutschlandsberg\",\"service\":\"ja\",\"umsatz\":100000},{\"bl\":\"Steiermark\",\"name\":\"SGS\",\"neukunde\":\"ja\",\"ort\":\"St. Stefan\",\"umsatz\":2000},{\"bl\":\"Steiermark\",\"name\":\"Rosel\",\"neukunde\":\"nein\",\"ort\":\"Birkfeld\",\"service\":\"Ja hat Interesse\",\"umsatz\":50000},{\"bl\":\"Steiermark\",\"name\":\"EGT Thier\",\"neukunde\":\"ja\",\"ort\":\"Fehring\",\"umsatz\":2000},{\"bl\":\"Steiermark\",\"name\":\"Deutschmann\",\"neukunde\":\"ja\",\"ort\":\"Trofaiach\",\"umsatz\":3000},{\"bl\":\"Steiermark\",\"name\":\"Heiger\",\"neukunde\":\"ja\",\"ort\":\"Irdning\",\"umsatz\":2000},{\"bl\":\"Kärnten\",\"name\":\"Wrann\",\"neukunde\":\"ja\",\"ort\":\"Velden\",\"umsatz\":3000}],\"source\":\"EP_Gebiets-Challenge_Regionsplan.xlsx\"}"}, {"path": "plans/west", "coll": "plans", "data": "{\"imported\":\"2026-10-20T18:54:22.058Z\",\"partners\":[{\"bl\":\"Tirol\",\"name\":\"SCHULER GES.M.B.H.\",\"ort\":\"Völs\",\"rang\":3},{\"bl\":\"Vorarlberg\",\"name\":\"EWF ELEKTROTECHNIK UND WARENHANDEL\",\"ort\":\"Frastanz\",\"rang\":5},{\"bl\":\"Vorarlberg\",\"name\":\"EP MADLENER GMBH\",\"ort\":\"Koblach\",\"rang\":6},{\"bl\":\"Vorarlberg\",\"name\":\"KOLB GMBH & CO KG\",\"neukunde\":\"ja\",\"ort\":\"Hard\",\"rang\":7,\"umsatz\":10000},{\"bl\":\"Vorarlberg\",\"name\":\"Joe Willi GmbH\",\"neukunde\":\"ja\",\"ort\":\"Andelsbuch\",\"rang\":10,\"umsatz\":10000},{\"bl\":\"Tirol\",\"name\":\"FALKNER & RIML GMBH\",\"neukunde\":\"ja\",\"ort\":\"Längenfeld\",\"rang\":19,\"umsatz\":10000},{\"bl\":\"Tirol\",\"name\":\"Grissemann Gesellschaft m.b.H.\",\"neukunde\":\"ja\",\"ort\":\"Zams\",\"rang\":36,\"umsatz\":20000},{\"bl\":\"Vorarlberg\",\"name\":\"ING. CHR. NEYER GMBH & CO KG\",\"neukunde\":\"ja\",\"ort\":\"Bludenz\",\"rang\":37,\"umsatz\":10000},{\"bl\":\"Tirol\",\"name\":\"ELEKTROTECHNIK SPORER GMBH\",\"ort\":\"Mayrhofen\",\"rang\":100},{\"bl\":\"Tirol\",\"name\":\"Easyonary GmbH\",\"neukunde\":\"ja\",\"ort\":\"Zell/Ziller\",\"rang\":106,\"umsatz\":20000},{\"bl\":\"Tirol\",\"name\":\"HOFER HAUSGERÄTETECHNIK KG\",\"ort\":\"Innsbruck\",\"rang\":135},{\"bl\":\"Tirol\",\"name\":\"WeDo EDV\",\"ort\":\"Jenbach\",\"rang\":308},{\"bl\":\"Tirol\",\"name\":\"FREYSINGER HANNES\",\"ort\":\"Ellmau\",\"rang\":366},{\"bl\":\"Tirol\",\"name\":\"HHGS  HAUSGERÄTE SERVICE OG\",\"neukunde\":\"ja\",\"ort\":\"Wattens\",\"rang\":427,\"umsatz\":5000},{\"bl\":\"Tirol\",\"name\":\"ELEKTRO STEINER e.U.\",\"ort\":\"Zellberg\",\"rang\":466},{\"bl\":\"Tirol\",\"name\":\"MÜHLMANN KARL\",\"ort\":\"Anras\",\"rang\":479},{\"bl\":\"Vorarlberg\",\"name\":\"WILLI ELEKTROGERÄTE HANDEL e.U.\",\"ort\":\"Andelsbuch\"},{\"bl\":\"Salzburg\",\"dan\":\"ja\",\"name\":\"Resch\",\"neukunde\":\"ja\",\"ort\":\"Braunau\",\"pos\":\"ja\",\"service\":\"nein\",\"umsatz\":50000},{\"name\":\"EP:Südtirol\",\"umsatz\":10000},{\"bl\":\"Vrbg\",\"name\":\"Degano\",\"neukunde\":\"ja\",\"ort\":\"Wolfurt\",\"service\":\"ja\",\"umsatz\":10000}],\"source\":\"EP_Gebiets-Challenge_Regionsplan.xlsx\"}"}];

// ---------------------------------------------------------------------------
// Anmeldung mit E-Mail + Passwort (eigene Sitzungen, kein Cloudflare Access nötig)
// Benutzer = alle E-Mails aus „Mitglieder & E-Mails“ (config/members) + ADMIN_EMAILS.
// Startpasswort gilt, bis der Benutzer ein eigenes Passwort setzt (Admin kann zurücksetzen).
// Optional: Variable START_PASSWORD ersetzt das eingebaute Startpasswort.
// ---------------------------------------------------------------------------
const START_SALT = "6570622d62656b6f2d7374617274";
const START_HASH = "b7bfb8fbe1b8ade9fed49efe3b83905651f3edaef34d8b5165f4d31c134110aa"; // PBKDF2 des Startpassworts
const PBKDF2_ITER = 100000;
const SESSION_DAYS = 30;
const COOKIE = "epb_sess";
const MAX_FAILS = 5, LOCK_MIN = 10;

const hex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
const unhex = h => new Uint8Array((h.match(/../g) || []).map(x => parseInt(x, 16)));
async function pbkdf2(password, saltHex) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(String(password)), "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: unhex(saltHex), iterations: PBKDF2_ITER }, key, 256));
}
async function sha256(s) { return hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))); }
function safeEq(a, b) { if (a.length !== b.length) return false; let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0; }
const normEmail = e => String(e || "").trim().toLowerCase();

function cookie(request, name) {
  const m = (request.headers.get("cookie") || "").match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  return m ? m[1] : null;
}
function adminList(env) { return String(env.ADMIN_EMAILS || "").toLowerCase().split(/[\s,;]+/).filter(Boolean); }

let memCache = { t: 0, map: null };
async function membersMap(env, fresh) {
  if (!fresh && memCache.map && Date.now() - memCache.t < 30000) return memCache.map;
  const row = await env.DB.prepare("SELECT data FROM docs WHERE path = 'config/members'").first();
  const map = {};
  try { for (const m of JSON.parse(row?.data || "{}").members || []) if (m.email) { const e = normEmail(m.email); if (!map[e]) map[e] = m.name || ""; } } catch (_) {}
  memCache = { t: Date.now(), map };
  return map;
}
async function isAllowed(env, email) { return adminList(env).includes(email) || Object.prototype.hasOwnProperty.call(await membersMap(env), email); }

async function checkPassword(env, email, password) {
  const row = await env.DB.prepare("SELECT salt, hash FROM users WHERE email = ?").bind(email).first();
  if (row) return { ok: safeEq(await pbkdf2(password, row.salt), row.hash), own: true };
  if (env.START_PASSWORD) return { ok: safeEq(await sha256(String(password)), await sha256(String(env.START_PASSWORD))), own: false };
  return { ok: safeEq(await pbkdf2(password, START_SALT), START_HASH), own: false };
}

async function isStartPassword(env, pw) {
  if (env.START_PASSWORD) return String(pw) === String(env.START_PASSWORD);
  return safeEq(await pbkdf2(pw, START_SALT), START_HASH);
}

async function getUser(request, env) {
  if (env.DEV_USER_EMAIL) { const e = normEmail(env.DEV_USER_EMAIL); return { id: e, email: e, admin: adminList(env).includes(e) }; } // nur lokal
  const tok = cookie(request, COOKIE);
  if (!tok || !/^[0-9a-f]{64}$/.test(tok)) return null;
  const s = await env.DB.prepare("SELECT email, expires FROM sessions WHERE id = ?").bind(await sha256(tok)).first();
  if (!s || s.expires < Date.now()) return null;
  if (!(await isAllowed(env, s.email))) return null; // aus Mitgliederliste entfernt → kein Zugang mehr
  return { id: s.email, email: s.email, admin: adminList(env).includes(s.email) };
}

function sessionCookie(token, maxAge) {
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

async function handleAuth(route, request, env) {
  const body = await request.json().catch(() => ({}));
  if (route === "login") {
    const email = normEmail(body.email), pw = String(body.password || "");
    const ip = request.headers.get("cf-connecting-ip") || "local";
    const now = Date.now();
    for (const key of ["e:" + email, "ip:" + ip]) {
      const f = await env.DB.prepare("SELECT n, until FROM login_fail WHERE k = ?").bind(key).first();
      if (f && f.until > now) return fail("locked", 429, `Zu viele Fehlversuche. Bitte in ${Math.ceil((f.until - now) / 60000)} Min. erneut versuchen.`);
    }
    const allowed = email && (await isAllowed(env, email));
    const res = allowed ? await checkPassword(env, email, pw) : { ok: false };
    if (!res.ok) {
      for (const [key, max] of [["e:" + email, MAX_FAILS], ["ip:" + ip, MAX_FAILS * 4]]) {
        const f = await env.DB.prepare("SELECT n FROM login_fail WHERE k = ?").bind(key).first();
        const n = (f?.n || 0) + 1;
        await env.DB.prepare("INSERT INTO login_fail (k, n, until) VALUES (?, ?, ?) ON CONFLICT(k) DO UPDATE SET n = excluded.n, until = excluded.until")
          .bind(key, n >= max ? 0 : n, n >= max ? now + LOCK_MIN * 60000 : 0).run();
      }
      return fail("invalid_login", 401, "E-Mail oder Passwort ist falsch.");
    }
    await env.DB.prepare("DELETE FROM login_fail WHERE k = ?").bind("e:" + email).run();
    const token = hex(crypto.getRandomValues(new Uint8Array(32)));
    await env.DB.batch([
      env.DB.prepare("INSERT INTO sessions (id, email, expires) VALUES (?, ?, ?)").bind(await sha256(token), email, now + SESSION_DAYS * 864e5),
      env.DB.prepare("DELETE FROM sessions WHERE expires < ?").bind(now),
      env.DB.prepare("INSERT INTO logins (email, last) VALUES (?, ?) ON CONFLICT(email) DO UPDATE SET last = excluded.last").bind(email, new Date(now).toISOString())
    ]);
    const r = json({ ok: true, mustChange: !res.own });
    r.headers.append("set-cookie", sessionCookie(token, SESSION_DAYS * 86400));
    return r;
  }
  if (route === "logout") {
    const tok = cookie(request, COOKIE);
    if (tok && /^[0-9a-f]{64}$/.test(tok)) await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(await sha256(tok)).run();
    const r = json({ ok: true });
    r.headers.append("set-cookie", sessionCookie("x", 0));
    return r;
  }
  const u = await getUser(request, env);
  if (!u) return fail("unauthenticated", 401, "Bitte anmelden");
  if (route === "password") {
    const nw = String(body.newPassword || "");
    if (nw.length < 8) return fail("weak_password", 400, "Das neue Passwort braucht mindestens 8 Zeichen.");
    const chk = await checkPassword(env, u.email, String(body.oldPassword || ""));
    if (!chk.ok) return fail("invalid_login", 401, "Das bisherige Passwort stimmt nicht.");
    if (await isStartPassword(env, nw)) return fail("weak_password", 400, "Bitte ein anderes Passwort als das Startpasswort wählen.");
    const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
    await env.DB.prepare("INSERT INTO users (email, salt, hash, updated) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET salt = excluded.salt, hash = excluded.hash, updated = excluded.updated")
      .bind(u.email, salt, await pbkdf2(nw, salt), new Date().toISOString()).run();
    const tok = cookie(request, COOKIE);
    await env.DB.prepare("DELETE FROM sessions WHERE email = ? AND id != ?").bind(u.email, tok ? await sha256(tok) : "").run(); // andere Geräte abmelden
    return json({ ok: true });
  }
  if (route === "admin/users") {
    if (!u.admin) return fail("permission_denied", 403);
    const names = await membersMap(env, true);
    const emails = [...new Set([...Object.keys(names), ...adminList(env)])].sort();
    const own = new Set(((await env.DB.prepare("SELECT email FROM users").all()).results || []).map(r => r.email));
    const last = {}; for (const r of (await env.DB.prepare("SELECT email, last FROM logins").all()).results || []) last[r.email] = r.last;
    return json({ users: emails.map(e => ({ email: e, name: names[e] || "", ownPassword: own.has(e), lastLogin: last[e] || null, admin: adminList(env).includes(e) })) });
  }
  if (route === "admin/reset") {
    if (!u.admin) return fail("permission_denied", 403);
    const e = normEmail(body.email);
    if (!e) return fail("invalid_argument", 400);
    await env.DB.batch([
      env.DB.prepare("DELETE FROM users WHERE email = ?").bind(e),
      env.DB.prepare("DELETE FROM sessions WHERE email = ?").bind(e),
      env.DB.prepare("DELETE FROM login_fail WHERE k = ?").bind("e:" + e)
    ]);
    return json({ ok: true });
  }
  return fail("not_found", 404);
}

const LOGIN_HTML = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Anmelden · EP × Beko Sales Challenge</title><meta name="robots" content="noindex">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏆</text></svg>">
<style>
:root{--bg:#eef1f6;--card:#fff;--fg:#121c2e;--muted:#5d687a;--line:#d6dce6;--navy:#13203a;--gold:#c8901b;--bad:#b3261e;color-scheme:light;
 box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root{--bg:#0d1320;--card:#151e2f;--fg:#e8edf5;--muted:#9aa6b8;--line:#2a3549;--navy:#0a1222;--gold:#e0a93a;--bad:#ff8a80;color-scheme:dark}}
*{box-sizing:border-box}html,body{height:100%}
body{margin:0;font:15px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:var(--bg);color:var(--fg);display:flex;flex-direction:column}
header{background:#13203a;color:#fff;padding:22px 20px}
header .in{max-width:420px;margin:0 auto}
header small{display:block;letter-spacing:.12em;text-transform:uppercase;font-size:11px;opacity:.75}
header h1{margin:4px 0 0;font-size:24px;line-height:1.15}
main{flex:1;display:flex;align-items:flex-start;justify-content:center;padding:28px 16px}
form{width:100%;max-width:420px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:22px;display:flex;flex-direction:column;gap:14px}
label{display:flex;flex-direction:column;gap:6px;font-weight:600;font-size:13px;color:var(--muted)}
input{font:inherit;padding:11px 12px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--fg);width:100%}
input:focus{outline:2px solid var(--gold);outline-offset:1px}
button{font-weight:700;font-size:15px;font-family:inherit;padding:12px;border-radius:8px;border:0;background:var(--gold);color:#1a1300;cursor:pointer}
button:disabled{opacity:.6;cursor:progress}
.err{color:var(--bad);font-size:14px;min-height:1.2em;margin:0}
.note{font-size:13px;color:var(--muted);margin:0}
a{color:inherit}
</style></head><body>
<header><div class="in"><small>Zielbild Sep–Dez 2026</small><h1>EP × Beko Sales Challenge</h1></div></header>
<main><form id="f" autocomplete="on">
<label>E-Mail<input type="email" id="e" name="username" autocomplete="username" required inputmode="email"></label>
<label>Passwort<input type="password" id="p" name="password" autocomplete="current-password" required></label>
<p class="err" id="m" role="alert"></p>
<button id="b" type="submit">Anmelden</button>
<p class="note">Zugang für das Team der Challenge. Passwort vergessen? <a href="mailto:harald.kasperowski@beko.com?subject=EP%20Beko%20Challenge%20%E2%80%93%20Passwort">harald.kasperowski@beko.com</a></p>
</form></main>
<script>
const f=document.getElementById("f"),m=document.getElementById("m"),b=document.getElementById("b");
try{const s=localStorage.getItem("epb-mail");if(s)document.getElementById("e").value=s;}catch(_){}
f.addEventListener("submit",async ev=>{ev.preventDefault();m.textContent="";b.disabled=true;b.textContent="Melde an …";
 const email=document.getElementById("e").value.trim(),password=document.getElementById("p").value;
 try{const r=await fetch("/api/login",{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json"},body:JSON.stringify({email,password})});
  const j=await r.json().catch(()=>({}));
  if(r.ok){try{localStorage.setItem("epb-mail",email);if(j.mustChange)sessionStorage.setItem("epb-must-change","1");}catch(_){} location.replace("/");return;}
  m.textContent=j.error||"Anmeldung nicht möglich.";
 }catch(_){m.textContent="Keine Verbindung. Bitte erneut versuchen.";}
 b.disabled=false;b.textContent="Anmelden";});
</script></body></html>`;

// EP × Beko Sales Challenge – API für Cloudflare Pages
// Bindings: DB (D1), FILES (KV). Variablen: ADMIN_EMAILS, optional START_PASSWORD, DEV_USER_EMAIL (nur lokal).

const SEG = /^[A-Za-z0-9_\-.~:@+]{1,200}$/;
const MAX_DOC = 256 * 1024;
const MAX_FILE = 20 * 1024 * 1024;
const FILE_TYPES = /^(application\/pdf|image\/(jpeg|png|webp|gif|heic|heif)|text\/(plain|csv))$/;
const ADMIN_ONLY = /^(config|actuals|approvals|orderStatus)\//;
const OWNED = /^(orders|photos|contracts|documents)\/([^/]+)$/;

let ready = false;
async function ensure(env) {
  if (ready) return;
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS docs (path TEXT PRIMARY KEY, coll TEXT NOT NULL, data TEXT NOT NULL, updated TEXT NOT NULL)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS docs_coll ON docs(coll)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, salt TEXT NOT NULL, hash TEXT NOT NULL, updated TEXT NOT NULL)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, email TEXT NOT NULL, expires INTEGER NOT NULL)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS logins (email TEXT PRIMARY KEY, last TEXT)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS login_fail (k TEXT PRIMARY KEY, n INTEGER NOT NULL, until INTEGER NOT NULL)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS mail_log (k TEXT PRIMARY KEY, kind TEXT NOT NULL, at TEXT NOT NULL, data TEXT NOT NULL)")
  ]);
  const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM docs").first();
  if (!c || !c.n) {
    const now = new Date().toISOString();
    await env.DB.batch(SEED.map(s => env.DB.prepare("INSERT OR IGNORE INTO docs (path, coll, data, updated) VALUES (?, ?, ?, ?)").bind(s.path, s.coll, s.data, now)));
  } else {
    // Bestehende Mitgliederliste: fehlende E-Mails aus der aktuellen Vorlage ergänzen (z. B. J. P. Hohenegger)
    const row = await env.DB.prepare("SELECT data FROM docs WHERE path = 'config/members'").first();
    try {
      const cur = JSON.parse(row?.data || "null"), base = JSON.parse(SEED.find(s => s.path === "config/members").data);
      let changed = false;
      for (const m of cur?.members || []) if (!m.email) { const b = base.members.find(x => x.name === m.name && x.role === m.role && x.email); if (b) { m.email = b.email; changed = true; } }
      if (changed) await env.DB.prepare("UPDATE docs SET data = ?, updated = ? WHERE path = 'config/members'").bind(JSON.stringify(cur), new Date().toISOString()).run();
    } catch (_) {}
  }
  ready = true;
}

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const fail = (code, s, msg) => json({ code, error: msg || code }, s);

function parsePath(p, minSegs) {
  if (typeof p !== "string") return null;
  const s = p.split("/");
  if (s.length < minSegs || s.length > 16 || !s.every(x => SEG.test(x))) return null;
  return { path: s.join("/"), coll: s.slice(0, -1).join("/"), id: s[s.length - 1], segs: s };
}
// private Nutzerdaten: data/users/<id>/...
function privateOwner(segs) { return segs[0] === "data" && segs[1] === "users" ? (segs[2] || "") : null; }

function canRead(u, segs) {
  const owner = privateOwner(segs);
  return owner === null || owner === u.id;
}
function canWrite(u, segs, path) {
  if (u.admin) return privateOwner(segs) === null || privateOwner(segs) === u.id;
  const owner = privateOwner(segs);
  if (owner !== null) return owner === u.id;
  if (ADMIN_ONLY.test(path)) return false;
  const m = path.match(OWNED);
  if (m) return m[2] === u.id;
  if (/^plans\/[^/]+$/.test(path)) return true;
  return false;
}

function nameFromEmail(e) {
  const l = String(e || "").split("@")[0];
  return l.split(/[._-]+/).filter(Boolean).map(x => x[0].toUpperCase() + x.slice(1)).join(" ");
}

async function handleApi(ctx) {
  const { request, env, params } = ctx;
  const route = (params.path || []).join("/");
  try {
    await ensure(env);
    if (request.method === "POST" && /^(login|logout|password|admin\/users|admin\/reset)$/.test(route)) return await handleAuth(route, request, env);
    if (request.method === "POST" && /^mail\/(run|status|settings|preview|test|send-now)$/.test(route)) return await handleMail(route, request, env, route === "mail/run" ? null : await getUser(request, env));
    const u = await getUser(request, env);

    if (route === "me" && request.method === "GET") {
      if (!u) return json({ ok: true, id: null });
      const names = await membersMap(env);
      const own = await env.DB.prepare("SELECT 1 AS x FROM users WHERE email = ?").bind(u.email).first();
      return json({ ok: true, id: u.id, email: u.email, admin: u.admin, name: names[u.email] || nameFromEmail(u.email), mustChange: !own });
    }
    if (!u) return fail("unauthenticated", 401, "Bitte anmelden");
    if (request.method !== "POST") return fail("method_not_allowed", 405);

    // ---- Dateien ----
    if (route === "assets") {
      const type = (request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
      if (!FILE_TYPES.test(type)) return fail("unsupported_type", 415);
      const len = +request.headers.get("content-length") || 0;
      if (len > MAX_FILE) return fail("too_large", 413);
      const buf = await request.arrayBuffer();
      if (buf.byteLength > MAX_FILE) return fail("too_large", 413);
      if (!buf.byteLength) return fail("empty", 400);
      const id = [...crypto.getRandomValues(new Uint8Array(16))].map(b => b.toString(16).padStart(2, "0")).join("");
      let name = "datei"; try { name = decodeURIComponent(request.headers.get("x-filename") || "datei").slice(0, 160); } catch (_) {}
      await env.FILES.put("a:" + id, buf, { metadata: { type, name, size: buf.byteLength, owner: u.id, at: new Date().toISOString() } });
      return json({ id, url: "/_blob/" + id, contentType: type, sizeBytes: buf.byteLength });
    }

    const body = await request.json().catch(() => ({}));

    if (route === "assets/delete") {
      const id = String(body.id || "");
      if (!/^[0-9a-f]{32}$/.test(id)) return fail("invalid_argument", 400);
      const r = await env.FILES.getWithMetadata("a:" + id, { type: "stream" });
      if (!r.value) return json({ ok: true });
      if (!u.admin && r.metadata?.owner !== u.id) return fail("permission_denied", 403);
      await env.FILES.delete("a:" + id);
      return json({ ok: true });
    }

    if (route === "profiles") {
      const names = await membersMap(env);
      const out = {};
      for (const id of (Array.isArray(body.ids) ? body.ids : []).slice(0, 200)) {
        const e = String(id).toLowerCase();
        out[id] = { name: names[e] || (e.includes("@") ? nameFromEmail(e) : "") };
      }
      return json({ profiles: out });
    }

    // ---- Datenbank ----
    if (route === "db/batch") {
      const qs = Array.isArray(body.queries) ? body.queries.slice(0, 50) : [];
      const results = [];
      for (const q of qs) {
        if (q.doc) {
          const p = parsePath(q.doc, 2);
          if (!p || !canRead(u, p.segs)) { results.push({ data: null }); continue; }
          const row = await env.DB.prepare("SELECT data FROM docs WHERE path = ?").bind(p.path).first();
          results.push({ data: row ? JSON.parse(row.data) : null });
        } else {
          const c = typeof q.collection === "string" ? q.collection.split("/") : [];
          if (!c.length || !c.every(x => SEG.test(x)) || !canRead(u, [...c, "x"])) { results.push({ docs: [] }); continue; }
          const { results: rows } = await env.DB.prepare("SELECT path, data FROM docs WHERE coll = ? ORDER BY path").bind(c.join("/")).all();
          results.push({ docs: rows.map(r => ({ id: r.path.split("/").pop(), data: JSON.parse(r.data) })) });
        }
      }
      return json({ results });
    }

    const p = parsePath(body.path, 2);
    if (!p) return fail("invalid_argument", 400, "Ungültiger Pfad");

    if (route === "db/get") {
      if (!canRead(u, p.segs)) return fail("permission_denied", 403);
      const row = await env.DB.prepare("SELECT data FROM docs WHERE path = ?").bind(p.path).first();
      return json({ data: row ? JSON.parse(row.data) : null });
    }

    if (!canWrite(u, p.segs, p.path)) return fail("permission_denied", 403, "Keine Berechtigung");

    if (route === "db/set" || route === "db/update") {
      if (!body.data || typeof body.data !== "object" || Array.isArray(body.data)) return fail("invalid_argument", 400);
      let data = body.data;
      if (route === "db/update") {
        const row = await env.DB.prepare("SELECT data FROM docs WHERE path = ?").bind(p.path).first();
        data = Object.assign(row ? JSON.parse(row.data) : {}, body.data);
      }
      const s = JSON.stringify(data);
      if (s.length > MAX_DOC) return fail("too_large", 413, "Dokument zu groß");
      await env.DB.prepare("INSERT INTO docs (path, coll, data, updated) VALUES (?, ?, ?, ?) ON CONFLICT(path) DO UPDATE SET data = excluded.data, updated = excluded.updated")
        .bind(p.path, p.coll, s, new Date().toISOString()).run();
      if (p.path === "config/members") memCache.t = 0;
      return json({ ok: true });
    }
    if (route === "db/delete") {
      await env.DB.prepare("DELETE FROM docs WHERE path = ?").bind(p.path).run();
      return json({ ok: true });
    }
    return fail("not_found", 404);
  } catch (e) {
    return fail("internal", 500, String(e?.message || e));
  }
}

// Liefert hochgeladene Dateien aus KV (nur für angemeldete Nutzer).
async function handleBlob({ request, env, params }) {
  const id = String(params.id || "");
  if (!/^[0-9a-f]{32}$/.test(id)) return new Response("Nicht gefunden", { status: 404 });
  if (!(await getUser(request, env))) return new Response("Bitte anmelden", { status: 401 });
  const r = await env.FILES.getWithMetadata("a:" + id, { type: "stream" });
  if (!r.value) return new Response("Nicht gefunden", { status: 404 });
  const m = r.metadata || {};
  const name = String(m.name || "datei").replace(/[^\w.\- äöüÄÖÜß]/g, "_");
  return new Response(r.value, { headers: {
    "content-type": m.type || "application/octet-stream",
    "content-disposition": `inline; filename*=UTF-8''${encodeURIComponent(name)}`,
    "cache-control": "private, max-age=3600",
    "x-content-type-options": "nosniff"
  }});
}


// ---------------------------------------------------------------------------
// Wochen- und Monatsmail
// Versand über Cloudflare Email Service (REST-API). Variablen im Pages-Projekt:
//   MAIL_FROM (z. B. challenge@ihre-domain.at), CF_ACCOUNT_ID, CF_API_TOKEN (Secret, Recht „Email Sending“),
//   CRON_KEY (Secret, gleicher Wert im Zeitplan-Worker), optional APP_URL.
// Zeitplan: kleiner Worker ruft stündlich freitags POST /api/mail/run mit Header x-cron-key auf.
// ---------------------------------------------------------------------------
const MX_MONTHS = [{k:"sep",l:"September",s:"Sep",n:9,y:2026},{k:"okt",l:"Oktober",s:"Okt",n:10,y:2026},{k:"nov",l:"November",s:"Nov",n:11,y:2026},{k:"dez",l:"Dezember",s:"Dez",n:12,y:2026}];
const MX_TEAMS = [{k:"ost",l:"Team Ost",c:"#2f6fd6"},{k:"sued",l:"Team Süd",c:"#c38a1c"},{k:"nord",l:"Team Nord",c:"#1f9a8a"},{k:"west",l:"Team West",c:"#b5476b"}];
const MX_CO = {k:"co",l:"Co-Trainer",c:"#7a8599"};
const MX_GOALS = [
  {k:"umsatz",l:"Umsatz",w:25,agg:"sum",unit:"eur"},{k:"neukunden",l:"Neukunden EP",w:15,agg:"sum",unit:"n"},
  {k:"pos",l:"POS-Installationen",w:15,agg:"sum",unit:"n"},{k:"danfirst",l:"DANFirst-Partner",w:15,agg:"sum",unit:"n"},
  {k:"share",l:"Sell-in In-house-Share",w:10,agg:"last",unit:"pp"},{k:"screens",l:"Digitale Screens",w:10,agg:"sum",unit:"n"},
  {k:"service",l:"Service Points",w:5,agg:"sum",unit:"n"},{k:"logik",l:"POS-Logik & Logistik",w:5,agg:"last",unit:"pct"}];
const MX_DEFAULT = { cap:120,
  targets:{ umsatz:{ost:875000,sued:675000,nord:250000,west:250000,co:450000}, neukunden:{ost:20,sued:12,nord:10,west:12}, pos:{ost:7,sued:10,nord:5,west:5},
    danfirst:{ost:5,sued:5,nord:5,west:5}, share:{ost:8,sued:15,nord:12,west:12}, screens:{ost:3,sued:3,nord:2,west:2}, service:{ost:4,sued:2,nord:2,west:2}, logik:{ost:100,sued:100,nord:100,west:100} },
  umsMonth:{ost:[227500,306250,236250,105000],sued:[175500,236250,182250,81000],nord:[65000,87500,67500,30000],west:[65000,87500,67500,30000],co:[117000,157500,121500,54000]} };
const MAIL_DEFAULT = { enabled:false, hour:15, note:"", monthly:true };
const ROLE_L = {ost:"Team Ost",sued:"Team Süd",nord:"Team Nord",west:"Team West",trainer:"Trainer",cotrainer:"Co-Trainer",mental:"Mentaltrainer"};

const nfDE0 = new Intl.NumberFormat("de-AT",{maximumFractionDigits:0});
const nfDE1 = new Intl.NumberFormat("de-AT",{minimumFractionDigits:1,maximumFractionDigits:1});
const tsdE = v => typeof v==="number" ? nfDE0.format(Math.round(v/1000)) : "–";
const pctE = (a,b) => (typeof a==="number" && b) ? nfDE0.format(a/b*100)+" %" : "–";
const escE = s => String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));

async function loadState(env){
  const all = (await env.DB.prepare("SELECT path, coll, data FROM docs WHERE coll IN ('actuals','plans','contracts','approvals','config')").all()).results || [];
  const st = { actuals:{}, plans:{}, contracts:[], approvals:{}, settings:null, members:[], mail:Object.assign({}, MAIL_DEFAULT) };
  for (const r of all){
    let d; try { d = JSON.parse(r.data); } catch(_) { continue; }
    const id = r.path.split("/").pop();
    if (r.coll==="actuals") st.actuals[id]=d;
    else if (r.coll==="plans") st.plans[id]=d;
    else if (r.coll==="approvals") st.approvals[id]=d;
    else if (r.coll==="contracts") for (const it of (d.items||[])) st.contracts.push(Object.assign({}, it, {key:id+"_"+it.id}));
    else if (r.path==="config/settings") st.settings=d;
    else if (r.path==="config/members") st.members=d.members||[];
    else if (r.path==="config/mail") Object.assign(st.mail, d);
  }
  const s = JSON.parse(JSON.stringify(MX_DEFAULT));
  if (st.settings){ Object.assign(s, st.settings); s.targets = Object.assign({}, MX_DEFAULT.targets, st.settings.targets||{}); s.umsMonth = Object.assign({}, MX_DEFAULT.umsMonth, st.settings.umsMonth||{}); }
  st.s = s;
  return st;
}
function cMonth(d){ const m=/^2026-(\d\d)/.exec(d||""); if(!m) return -1; return {"09":0,"10":1,"11":2,"12":3}[m[1]] ?? -1; }
const cStatus = (st,c) => st.approvals[c.key]?.status || "open";
const cKind = c => c.kind==="incentive" ? "incentive" : "pos";
function cCount(st, team, mi){ return st.contracts.filter(c=>cKind(c)==="pos" && c.team===team && cMonth(c.date)===mi && cStatus(st,c)==="approved").length; }
function actUpTo(st, g, team, mi){
  let s=null;
  for (let i=0;i<=mi;i++){ let v=st.actuals[MX_MONTHS[i].k+"-"+team]?.[g.k]; if (g.k==="pos"){ const c=cCount(st,team,i); if(c) v=(typeof v==="number"?v:0)+c; } if (typeof v!=="number") continue; s = g.agg==="sum" ? (s||0)+v : v; }
  return s;
}
function scoreOf(st, team, mi){
  const cap=(st.s.cap||100)/100; let total=0; const per={};
  for (const g of MX_GOALS){ const max=g.w/4, tgt=st.s.targets[g.k]?.[team]||0, a=actUpTo(st,g,team,mi); const ratio = tgt>0 && a!=null ? Math.max(0,a/tgt) : 0; const p=max*Math.min(ratio,cap); per[g.k]={a,tgt,ratio,p,max}; total+=p; }
  return {total, per};
}
function lastMonth(st){ let last=-1; MX_MONTHS.forEach((m,i)=>{ if (MX_TEAMS.concat(MX_CO).some(t=>{ const d=st.actuals[m.k+"-"+t.k]; return d && Object.values(d).some(v=>typeof v==="number"); })) last=i; }); return last; }

function viennaNow(d){
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Vienna",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",weekday:"short",hourCycle:"h23"}).formatToParts(d||new Date()).map(x=>[x.type,x.value]));
  return { y:+p.year, m:+p.month, d:+p.day, h:+p.hour, wd:p.weekday };
}
function isoWeek(y,m,d){ const t=new Date(Date.UTC(y,m-1,d)); const day=t.getUTCDay()||7; t.setUTCDate(t.getUTCDate()+4-day); const y1=new Date(Date.UTC(t.getUTCFullYear(),0,1)); return {y:t.getUTCFullYear(), w:Math.ceil(((t-y1)/864e5+1)/7)}; }

function recipients(st){
  const seen = {}; const out=[];
  for (const m of st.members){ const e=String(m.email||"").trim().toLowerCase(); if (!e || !/@/.test(e)) continue;
    if (!seen[e]){ seen[e]={email:e, name:m.name||"", roles:[]}; out.push(seen[e]); } if (!seen[e].roles.includes(m.role)) seen[e].roles.push(m.role); }
  const off = new Set((st.mail.optOut||[]).map(x=>String(x).toLowerCase()));
  return out.filter(r=>!off.has(r.email));
}

// ---- E-Mail-HTML ----
function mailHtml(st, opts){
  const { kind, rec, appUrl, prev } = opts;           // kind: weekly | monthly
  const auto = Math.max(0, lastMonth(st));
  const mi = kind==="monthly" ? opts.month : auto;
  const mo = MX_MONTHS[mi];
  const teams = MX_TEAMS.map(t=>({t, sc:scoreOf(st,t.k,mi)})).sort((a,b)=>b.sc.total-a.sc.total);
  const myTeams = (rec?.roles||[]).filter(r=>MX_TEAMS.some(t=>t.k===r));
  const title = kind==="monthly" ? `Monatsabschluss ${mo.l} 2026` : `Wochenstand KW ${opts.week}`;
  const hello = rec?.name ? `Hallo ${escE(rec.name)},` : "Hallo,";
  const th = 'style="text-align:left;padding:8px 10px;background:#0f1d36;color:#fff;font-size:12px;font-weight:600;letter-spacing:.03em"';
  const thr = th.replace("text-align:left","text-align:right");
  const td = 'style="padding:8px 10px;border-bottom:1px solid #e3e7ee;font-size:14px;color:#121c2e"';
  const tdr = td.replace("padding:","text-align:right;padding:");
  const dot = c => `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${c};margin-right:6px"></span>`;
  const h2 = s => `<h2 style="margin:26px 0 10px;font-size:17px;color:#0f1d36">${s}</h2>`;
  let html = `<p style="margin:0 0 10px;font-size:15px">${hello}</p>`;
  html += kind==="monthly"
    ? `<p style="margin:0 0 6px;font-size:15px">hier der Abschluss für <b>${mo.l}</b>: Umsatz im Monat, Zielerreichung und Punktestand nach ${mo.l}.</p>`
    : `<p style="margin:0 0 6px;font-size:15px">hier der aktuelle Stand der EP × Beko Sales Challenge (Werte bis ${mo.l} 2026).</p>`;
  if (st.mail.note) html += `<p style="margin:10px 0 0;padding:10px 12px;background:#fff7e6;border-left:4px solid #c8901b;font-size:14px">${escE(st.mail.note).replace(/\n/g,"<br>")}</p>`;
  // Rangliste
  html += h2("Rangliste") + `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tr><th ${th}>Rang</th><th ${th}>Team</th><th ${thr}>Punkte</th>${prev?`<th ${thr}>Δ Vorwoche</th>`:""}<th ${thr}>Umsatz Ist</th><th ${thr}>Ziel</th><th ${thr}>Ist/Ziel</th></tr>`;
  teams.forEach((x,i)=>{ const u=x.sc.per.umsatz; const d = prev && typeof prev[x.t.k]==="number" ? x.sc.total-prev[x.t.k] : null;
    const mine = myTeams.includes(x.t.k) ? "background:#f3f6fb;font-weight:700;" : "";
    html += `<tr style="${mine}"><td ${td}>${i+1}.</td><td ${td}>${dot(x.t.c)}${x.t.l}</td><td ${tdr}><b>${nfDE1.format(x.sc.total)}</b> / 25</td>${prev?`<td ${tdr}>${d==null?"–":(d>0?"+":"")+nfDE1.format(d)}</td>`:""}<td ${tdr}>${tsdE(u.a)}</td><td ${tdr}>${tsdE(u.tgt)}</td><td ${tdr}>${pctE(u.a,u.tgt)}</td></tr>`; });
  html += `</table><p style="margin:6px 0 0;font-size:12px;color:#5d687a">Umsatz in Tsd. €, kumuliert Sep–${mo.s}. Punkte max. 25 je Team, Zielerreichung gedeckelt bei ${st.s.cap||120} %.</p>`;
  // Umsatz je Monat (Monatsmail) bzw. Umsatz-Überblick
  if (kind==="monthly"){
    html += h2(`Umsatz im ${mo.l}`) + `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tr><th ${th}>Team</th><th ${thr}>Ist ${mo.s}</th><th ${thr}>Monatsziel</th><th ${thr}>Ist/Ziel</th></tr>`;
    let si=0, sz=0;
    for (const t of MX_TEAMS.concat(MX_CO)){ const v=st.actuals[mo.k+"-"+t.k]?.umsatz; const z=(st.s.umsMonth?.[t.k]||[])[mi]||0; if (typeof v==="number") si+=v; sz+=z;
      html += `<tr><td ${td}>${dot(t.c)}${t.l}</td><td ${tdr}>${tsdE(v)}</td><td ${tdr}>${tsdE(z)}</td><td ${tdr}>${pctE(v,z)}</td></tr>`; }
    html += `<tr><td ${td}><b>Gesamt</b></td><td ${tdr}><b>${tsdE(si)}</b></td><td ${tdr}><b>${tsdE(sz)}</b></td><td ${tdr}><b>${pctE(si,sz)}</b></td></tr></table>`;
  }
  // Eigenes Team
  for (const tk of myTeams){
    const t = MX_TEAMS.find(x=>x.k===tk), sc = scoreOf(st,tk,mi);
    html += h2(`${dot(t.c)}${t.l}: Stand je Ziel`) + `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tr><th ${th}>Ziel</th><th ${thr}>Ist</th><th ${thr}>Ziel</th><th ${thr}>Erreicht</th><th ${thr}>Punkte</th></tr>`;
    for (const g of MX_GOALS){ const p=sc.per[g.k]; const f = v => v==null ? "–" : g.unit==="eur" ? tsdE(v)+" Tsd." : g.unit==="pp" ? "+"+nfDE1.format(v)+" PP" : g.unit==="pct" ? nfDE0.format(v)+" %" : nfDE0.format(v);
      const r = p.tgt ? Math.round(p.ratio*100) : null; const col = r==null ? "#5d687a" : r>=100 ? "#1b7f3b" : r>=70 ? "#9a6b00" : "#b3261e";
      html += `<tr><td ${td}>${g.l}</td><td ${tdr}>${f(p.a)}</td><td ${tdr}>${f(p.tgt)}</td><td ${tdr}><span style="color:${col};font-weight:700">${r==null?"–":r+" %"}</span></td><td ${tdr}>${nfDE1.format(p.p)} / ${nfDE1.format(p.max)}</td></tr>`; }
    html += `</table>`;
    const ps = (st.plans[tk]?.partners||[]).map(p=>{ let s=0, any=false; for (const m of MX_MONTHS.slice(0, mi+1)){ const v=p.ist?.[m.k]; if (typeof v==="number"){ s+=v; any=true; } } return {p, s:any?s:null}; });
    const top = ps.filter(x=>x.s!=null).sort((a,b)=>b.s-a.s).slice(0,5);
    if (top.length){
      html += `<p style="margin:16px 0 6px;font-weight:700;font-size:14px">Top-Partner nach Ist-Umsatz</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tr><th ${th}>Partner</th><th ${thr}>Ist</th><th ${thr}>Ziel</th><th ${thr}>Ist/Ziel</th></tr>`;
      for (const x of top) html += `<tr><td ${td}>${escE(x.p.name)}${x.p.ort?`<span style="color:#5d687a"> · ${escE(x.p.ort)}</span>`:""}</td><td ${tdr}>${tsdE(x.s)}</td><td ${tdr}>${tsdE(x.p.umsatz)}</td><td ${tdr}>${pctE(x.s,x.p.umsatz)}</td></tr>`;
      html += `</table>`;
    }
    const open = st.contracts.filter(c=>c.team===tk && cKind(c)==="pos" && cStatus(st,c)==="open").length;
    const ok = st.contracts.filter(c=>c.team===tk && cKind(c)==="pos" && cStatus(st,c)==="approved").length;
    const noIst = ps.filter(x=>x.s==null && typeof x.p.umsatz==="number" && x.p.umsatz>0).length;
    html += `<p style="margin:12px 0 0;font-size:14px">POS-Verträge: <b>${ok}</b> freigegeben, ${open} offen zur Freigabe (Ziel ${st.s.targets.pos?.[tk]||0}).${noIst?` · ${noIst} Partner mit Umsatzziel haben noch keinen Ist-Umsatz.`:""}</p>`;
  }
  const url = appUrl || "";
  if (url) html += `<p style="margin:26px 0 0"><a href="${escE(url)}" style="display:inline-block;background:#c8901b;color:#1a1300;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:8px">Zur Challenge-App</a></p>`;
  const body = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escE(title)}</title></head>
<body style="margin:0;padding:0;background:#eef1f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#121c2e">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef1f6"><tr><td align="center" style="padding:20px 10px">
<table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#0f1d36;padding:20px 24px;color:#ffffff"><div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.8">EP × Beko Sales Challenge</div><div style="font-size:22px;font-weight:700;margin-top:4px">${escE(title)}</div></td></tr>
<tr><td style="padding:22px 24px">${html}</td></tr>
<tr><td style="padding:16px 24px;background:#f6f8fb;font-size:12px;color:#5d687a">Sie erhalten diese Mail als Teilnehmer der EP × Beko Sales Challenge${rec?.roles?.length?` (${rec.roles.map(r=>ROLE_L[r]||r).join(", ")})`:""}. Fragen: <a href="mailto:harald.kasperowski@beko.com" style="color:#0f1d36">harald.kasperowski@beko.com</a></td></tr>
</table></td></tr></table></body></html>`;
  const subject = kind==="monthly" ? `EP × Beko Challenge · Monatsabschluss ${mo.l}` : `EP × Beko Challenge · Wochenstand KW ${opts.week}: ${teams[0].t.l} führt mit ${nfDE1.format(teams[0].sc.total)} Punkten`;
  const text = `${title}\n\nRangliste:\n` + teams.map((x,i)=>`${i+1}. ${x.t.l}: ${nfDE1.format(x.sc.total)} Punkte · Umsatz ${tsdE(x.sc.per.umsatz.a)} von ${tsdE(x.sc.per.umsatz.tgt)} Tsd. €`).join("\n") + (url?`\n\nZur App: ${url}`:"") + `\n\nFragen: harald.kasperowski@beko.com`;
  return { subject, html:body, text, points:Object.fromEntries(teams.map(x=>[x.t.k, Math.round(x.sc.total*100)/100])) };
}

async function sendMail(env, to, m){
  if (!env.MAIL_FROM) throw new Error("MAIL_FROM fehlt");
  const from = { email: env.MAIL_FROM, name: "EP × Beko Sales Challenge" };
  if (env.EMAIL && typeof env.EMAIL.send === "function"){ const r = await env.EMAIL.send({ to, from, subject:m.subject, html:m.html, text:m.text }); return { ok:true, id:r?.messageId }; }
  if (!env.CF_ACCOUNT_ID || !env.CF_API_TOKEN) throw new Error("CF_ACCOUNT_ID / CF_API_TOKEN fehlen");
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`, {
    method:"POST", headers:{ "authorization":"Bearer "+env.CF_API_TOKEN, "content-type":"application/json" },
    body: JSON.stringify({ to, from, subject:m.subject, html:m.html, text:m.text }) });
  const j = await r.json().catch(()=>({}));
  if (!r.ok || j.success===false){ const e=(j.errors||[])[0]; throw new Error(e ? `${e.code} ${e.message}` : "HTTP "+r.status); }
  const res = j.result||{}; if ((res.permanent_bounces||[]).length) throw new Error("Unzustellbar (Bounce)");
  return { ok:true };
}

function appUrlOf(env, request){ return env.APP_URL || (request ? new URL(request.url).origin : ""); }

async function sendRound(env, st, kind, opts){
  const recs = opts.only ? opts.only : recipients(st);
  const results = [];
  for (const rec of recs){
    try { const m = mailHtml(st, Object.assign({}, opts, {kind, rec})); await sendMail(env, rec.email, m); results.push({email:rec.email, ok:true}); }
    catch(e){ results.push({email:rec.email, ok:false, error:String(e.message||e).slice(0,200)}); }
  }
  return results;
}

async function mailLog(env, key, kind, data){
  await env.DB.prepare("INSERT INTO mail_log (k, kind, at, data) VALUES (?, ?, ?, ?) ON CONFLICT(k) DO UPDATE SET at = excluded.at, data = excluded.data").bind(key, kind, new Date().toISOString(), JSON.stringify(data)).run();
}
async function lastWeeklyPoints(env){
  const r = await env.DB.prepare("SELECT data FROM mail_log WHERE kind = 'weekly' ORDER BY at DESC LIMIT 1").first();
  try { return JSON.parse(r?.data||"null")?.points || null; } catch(_) { return null; }
}

// Geplanter Lauf: Freitag ab eingestellter Stunde (Wien), einmal pro Woche
async function mailRun(env, request, force){
  const st = await loadState(env);
  if (!st.mail.enabled && !force) return { skipped:"Versand ist ausgeschaltet" };
  const now = viennaNow();
  if (!force && (now.wd!=="Fri" || now.h < (st.mail.hour||15))) return { skipped:`Nicht Versandzeit (${now.wd} ${now.h} Uhr)` };
  const wk = isoWeek(now.y, now.m, now.d);
  const key = `w-${wk.y}-${String(wk.w).padStart(2,"0")}`;
  if (!force && await env.DB.prepare("SELECT 1 AS x FROM mail_log WHERE k = ?").bind(key).first()) return { skipped:"Diese Woche bereits versendet" };
  // Erster Freitag im Monat → Monatsabschluss für den Vormonat (falls in der Challenge)
  let kind = "weekly", month = null;
  if (st.mail.monthly !== false && now.d <= 7){ const pm = now.m===1 ? 12 : now.m-1; const i = MX_MONTHS.findIndex(m=>m.n===pm); if (i>=0) { kind="monthly"; month=i; } }
  const prev = kind==="weekly" ? await lastWeeklyPoints(env) : null;
  const opts = { week:wk.w, month, appUrl:appUrlOf(env, request), prev };
  const results = await sendRound(env, st, kind, opts);
  const pts = mailHtml(st, Object.assign({}, opts, {kind, rec:null})).points;
  await mailLog(env, key, kind==="monthly" ? "monthly" : "weekly", { points:pts, results, month });
  if (st.mail.note && results.some(r=>r.ok)) await env.DB.prepare("UPDATE docs SET data = ?, updated = ? WHERE path = 'config/mail'").bind(JSON.stringify(Object.assign({}, st.mail, {note:""})), new Date().toISOString()).run(); // Hinweis gilt nur für eine Mail
  return { sent: results.filter(r=>r.ok).length, failed: results.filter(r=>!r.ok), kind };
}

async function handleMail(route, request, env, u){
  const body = await request.json().catch(()=>({}));
  if (route === "mail/run"){
    const key = request.headers.get("x-cron-key") || "";
    if (!env.CRON_KEY || key.length < 16 || key !== env.CRON_KEY) return fail("permission_denied", 403, "Falscher Schlüssel");
    return json(await mailRun(env, request, false));
  }
  if (!u) return fail("unauthenticated", 401, "Bitte anmelden");
  if (!u.admin) return fail("permission_denied", 403);
  const st = await loadState(env);
  const now = viennaNow(); const wk = isoWeek(now.y, now.m, now.d);
  if (route === "mail/status"){
    const log = ((await env.DB.prepare("SELECT k, kind, at, data FROM mail_log ORDER BY at DESC LIMIT 12").all()).results||[]).map(r=>{ let d={}; try{ d=JSON.parse(r.data); }catch(_){} return { k:r.k, kind:r.kind, at:r.at, ok:(d.results||[]).filter(x=>x.ok).length, failed:(d.results||[]).filter(x=>!x.ok) }; });
    return json({ settings:st.mail, configured:{ from:env.MAIL_FROM||null, api:!!(env.EMAIL || (env.CF_ACCOUNT_ID && env.CF_API_TOKEN)), cron:!!env.CRON_KEY, appUrl:appUrlOf(env, request) }, recipients:recipients(st).map(r=>({email:r.email, name:r.name, roles:r.roles})), optOut:st.mail.optOut||[], log, week:wk.w });
  }
  if (route === "mail/settings"){
    const m = Object.assign({}, st.mail, { enabled:!!body.enabled, hour:Math.min(20,Math.max(6,+body.hour||15)), note:String(body.note||"").slice(0,1000), monthly:body.monthly!==false, optOut:Array.isArray(body.optOut)?body.optOut.map(x=>String(x).toLowerCase()).slice(0,100):(st.mail.optOut||[]) });
    await env.DB.prepare("INSERT INTO docs (path, coll, data, updated) VALUES ('config/mail','config',?,?) ON CONFLICT(path) DO UPDATE SET data = excluded.data, updated = excluded.updated").bind(JSON.stringify(m), new Date().toISOString()).run();
    return json({ ok:true, settings:m });
  }
  const kind = body.kind==="monthly" ? "monthly" : "weekly";
  const month = kind==="monthly" ? (Number.isInteger(body.month) ? body.month : Math.max(0, lastMonth(st))) : null;
  const opts = { week:wk.w, month, appUrl:appUrlOf(env, request), prev: kind==="weekly" ? await lastWeeklyPoints(env) : null };
  if (route === "mail/preview"){
    const role = String(body.role||"");
    const rec = { email:u.email, name:body.name||"", roles: role ? [role] : [] };
    const m = mailHtml(st, Object.assign({}, opts, {kind, rec}));
    return json({ subject:m.subject, html:m.html });
  }
  if (route === "mail/test"){
    const me = recipients(st).find(r=>r.email===u.email) || { email:u.email, name:"", roles:[String(body.role||"")].filter(Boolean) };
    if (body.role) me.roles=[String(body.role)];
    const res = await sendRound(env, st, kind, Object.assign({}, opts, {only:[me]}));
    return json({ results:res });
  }
  if (route === "mail/send-now"){
    const res = await sendRound(env, st, kind, opts);
    const pts = mailHtml(st, Object.assign({}, opts, {kind, rec:null})).points;
    await mailLog(env, `manual-${Date.now()}`, kind, { points:pts, results:res, month });
    return json({ results:res });
  }
  return fail("not_found", 404);
}

const htmlHeaders = { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-frame-options": "DENY", "referrer-policy": "same-origin", "x-robots-tag": "noindex" };

export default {
  // Zeitplan (Cron in wrangler.jsonc): freitags stündlich; versendet nur einmal ab der eingestellten Uhrzeit
  async scheduled(event, env, ctx) {
    if (!env.ADMIN_EMAILS) env = Object.assign({}, env, { ADMIN_EMAILS: "harald.kasperowski@beko.com" });
    if (!env.DB) return;
    ctx.waitUntil((async () => { await ensure(env); const r = await mailRun(env, null, false); console.log("Mail-Lauf", JSON.stringify(r)); })());
  },
  async fetch(request, env, ctx) {
    if (!env.ADMIN_EMAILS) env = Object.assign({}, env, { ADMIN_EMAILS: "harald.kasperowski@beko.com" });
    const url = new URL(request.url);
    if (!env.DB || !env.FILES) return new Response(JSON.stringify({ code: "not_configured", error: "Bindings DB/FILES fehlen" }), { status: 503, headers: { "content-type": "application/json" } });
    if (url.pathname.startsWith("/api/")) {
      const path = url.pathname.slice(5).split("/").filter(Boolean);
      return handleApi({ request, env, params: { path } });
    }
    const m = url.pathname.match(/^\/_blob\/([^/]+)$/);
    if (m) return handleBlob({ request, env, params: { id: m[1] } });
    // Ganze Seite nur nach Anmeldung
    await ensure(env);
    const u = await getUser(request, env);
    if (!u) {
      if (url.pathname === "/" || url.pathname === "/index.html" || url.pathname === "/login") return new Response(LOGIN_HTML, { status: 200, headers: htmlHeaders });
      return new Response(null, { status: 302, headers: { location: "/", "cache-control": "no-store" } });
    }
    if (url.pathname === "/login") return new Response(null, { status: 302, headers: { location: "/" } });
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    out.headers.set("cache-control", url.pathname.startsWith("/kataloge/") ? "private, max-age=86400" : "no-store");
    return out;
  }
};
