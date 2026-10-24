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
<link rel="icon" type="image/png" href="data:image/png;base64,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"><link rel="apple-touch-icon" href="data:image/png;base64,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"><meta name="theme-color" content="#0f1d36">
<style>
:root{--bg:#eef1f6;--card:#fff;--fg:#121c2e;--muted:#5d687a;--line:#d6dce6;--navy:#13203a;--gold:#c8901b;--bad:#b3261e;color-scheme:light;
 box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root{--bg:#0d1320;--card:#151e2f;--fg:#e8edf5;--muted:#9aa6b8;--line:#2a3549;--navy:#0a1222;--gold:#e0a93a;--bad:#ff8a80;color-scheme:dark}}
*{box-sizing:border-box}html,body{height:100%}
body{margin:0;font:15px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:var(--bg);color:var(--fg);display:flex;flex-direction:column}
header{background:#13203a;color:#fff;padding:22px 20px}
header .in{max-width:420px;margin:0 auto;display:flex;align-items:center;gap:14px}
header img{width:64px;height:64px;flex:none}
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
<header><div class="in"><img src="data:image/webp;base64,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" alt="EP: × Beko #Team Challenge 2026" width="64" height="64"><div><small>Zielbild Sep–Dez 2026</small><h1>EP × Beko Sales Challenge</h1></div></div></header>
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
const cKind = c => c.kind==="incentive" ? "incentive" : c.kind==="neukunde" ? "neukunde" : "pos";
function cCount(st, team, mi, kind){ kind=kind||"pos"; return st.contracts.filter(c=>cKind(c)===kind && c.team===team && cMonth(c.date)===mi && cStatus(st,c)==="approved").length; }
function actUpTo(st, g, team, mi){
  let s=null;
  for (let i=0;i<=mi;i++){ let v=st.actuals[MX_MONTHS[i].k+"-"+team]?.[g.k]; if (g.k==="pos"||g.k==="neukunden"){ const c=cCount(st,team,i,g.k==="pos"?"pos":"neukunde"); if(c) v=(typeof v==="number"?v:0)+c; } if (typeof v!=="number") continue; s = g.agg==="sum" ? (s||0)+v : v; }
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
