console.log("kata.js");
document.querySelector('h1').style.color = 'red';
console.log("Datum:", document.getElementById('currentDate'));

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
function istHeuteGeburtstag(geburtsdatum) {
  console.log("Hat heute Geburtstag:", geburtsdatum);
  const heute = new Date();
  const aktuellerMonat = heute.getMonth() + 1; // 
  const aktuellerTag = heute.getDate();
 
  console.log("AktuellDatum", aktuellerTag + "/" + aktuellerMonat);
  const geburtsteile = geburtsdatum.split('/');
  const geburtsmonat = parseInt(geburtsteile[1]);
  const geburtstag = parseInt(geburtsteile[2]);
  console.log("GeburtsDatum", geburtstag + "/" + geburtsmonat);
 
  const resultado = geburtsmonat === aktuellerMonat && geburtstag === aktuellerTag;
  console.log("¿Hat Geburtstag", resultado);
  return resultado;
}
function sendeGeburtstagsEmail(empfaenger, vorname) {
  console.log("Sende E-Mail an: " + empfaenger);
  console.log("Betreff: Happy birthday!");
  console.log("Inhalt: Happy birthday, dear " + vorname + "!");
  console.log("------------------------");
}

function sendeErinnerungsEmail(empfaenger, empfaengerVorname, geburtstagsPerson) {

  
  console.log("Sende E-Mail an: " + empfaenger);
  console.log("Betreff: Birthday Reminder");
  console.log("Inhalt: Dear " + empfaengerVorname + ",");
  console.log("");
  console.log("Today is " + geburtstagsPerson.vorname + " " + geburtstagsPerson.nachname + "'s birthday.");
  console.log("Don't forget to send them a message!");
  console.log("------------------------");
  
}

function pruefeGeburtstage() {
  console.log("Ejecutando pruefeGeburtstage()");
  let birthdaysFound = false;
 
  for (let i = 0; i < freunde.length; i++) {
    const freund = freunde[i];
   
    if (istHeuteGeburtstag(freund.geburtsdatum)) {
      birthdaysFound = true;
      sendeGeburtstagsEmail(freund.email, freund.vorname);
      for (let j = 0; j < freunde.length; j++) {
        if (i !== j) { 
          const andererFreund = freunde[j];
          sendeErinnerungsEmail(andererFreund.email, andererFreund.vorname, freund);
        }
      }
    }
  }
 
  if (!birthdaysFound) {
    console.log("Niemand hat Geburtstag");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM completamente cargado");
  console.log("Datum:", new Date().toLocaleDateString('de-DE'));
  document.getElementById('currentDate').textContent = new Date().toLocaleDateString('de-DE');
  console.log("Fecha actualizada en el DOM");
  
  const checkButton = document.getElementById('checkBirthdays');
  if (checkButton) {
    console.log("Buton gefunden");
    checkButton.addEventListener('click', function() {
      console.log("Buton click");
      pruefeGeburtstage();
    });
  } else {
    console.log("ERROR: Buton nicht gefunden");
  }
});   






