// Funktion, um das aktuelle Datum im Format XX.Monat zu erhalten
function getAktuellesDatum() {
    const monate = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    
    const heute = new Date();
    const tag = heute.getDate();
    const monat = monate[heute.getMonth()];
    
    return tag + '.' + monat;
  }
  
  // Das Datum in einem HTML-Element mit der ID 'datumAnzeige' anzeigen
  document.getElementById('datumAnzeige').textContent = getAktuellesDatum();
  