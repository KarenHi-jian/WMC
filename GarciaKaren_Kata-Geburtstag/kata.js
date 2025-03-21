// Datei: geburtstag.js

// Freunde-Daten (normalerweise aus einer Datei gelesen)
const freunde = [
  {
    nachname: "Müller",
    vorname: "Hans",
    geburtsdatum: "1982/10/08",
    email: "hans.mueller@example.com"
  },
  {
    nachname: "Schmidt",
    vorname: "Anna",
    geburtsdatum: "1975/09/11",
    email: "anna.schmidt@example.com"
  }
];

// Aktuelles Datum
const heute = new Date();
const aktuellerMonat = heute.getMonth() + 1; // JavaScript Monate beginnen bei 0
const aktuellerTag = heute.getDate();

// Für jeden Freund prüfen, ob heute Geburtstag ist
for (let i = 0; i < freunde.length; i++) {
  const freund = freunde[i];
  
  // Geburtsdatum in Teile zerlegen
  // Format ist YYYY/MM/DD
  const geburtsteile = freund.geburtsdatum.split('/');
  const geburtsmonat = parseInt(geburtsteile[1]);
  const geburtstag = parseInt(geburtsteile[2]);
  
  // Prüfen ob heute Geburtstag ist
  if (geburtsmonat === aktuellerMonat && geburtstag === aktuellerTag) {
    // E-Mail senden (hier nur simuliert mit console.log)
    console.log("Sende E-Mail an: " + freund.email);
    console.log("Betreff: Happy birthday!");
    console.log("Inhalt: Happy birthday, dear " + freund.vorname + "!");
    console.log("------------------------");
    
    // Erinnerung an andere Freunde senden
    for (let j = 0; j < freunde.length; j++) {
      // Nicht an das Geburtstagskind senden
      if (i !== j) {
        const andererFreund = freunde[j];
        console.log("Sende E-Mail an: " + andererFreund.email);
        console.log("Betreff: Birthday Reminder");
        console.log("Inhalt: Dear " + andererFreund.vorname + ",");
        console.log("");
        console.log("Today is " + freund.vorname + " " + freund.nachname + "'s birthday.");
        console.log("Don't forget to send them a message!");
        console.log("------------------------");
      }
    }
  }
}
