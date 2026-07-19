# SWC - Swiss News Website

Eine moderne Nachrichtenseite mit aktuellen News und Wetterinformationen.

## Projektstart

### Voraussetzungen
- Python 3.x (für den lokalen Server) oder ein anderer Webserver
- Ein moderner Webbrowser

### Installation und Start

1. **Repository klonen:**
   ```bash
   git clone https://github.com/arturict/SWC.git
   cd SWC/Projekt
   ```

2. **Lokalen Server starten:**
   
   **Option 1: Mit Python (empfohlen):**
   ```bash
   python3 -m http.server 8080
   ```
   
   **Option 2: Mit Node.js (falls verfügbar):**
   ```bash
   npx http-server -p 8080
   ```

3. **Website öffnen:**
   Öffne deinen Browser und gehe zu: `http://localhost:8080`

### Projektstruktur

```
Projekt/
├── index.html          # Hauptseite
├── CSS/               # Stylesheets
│   ├── index.css      # Haupt-CSS
│   ├── news.css       # News-Seite Styles
│   ├── artikel.css    # Artikel-Seite Styles
│   ├── kontakt.css    # Kontakt-Seite Styles
│   └── wetter.css     # Wetter-Seite Styles
├── News/              # News-Seiten
├── Artikel/           # Artikel-Seiten
├── Kontakt/           # Kontakt-Seite
├── Wetter/            # Wetter-Seite
├── img/               # Bilder und Assets
└── java/              # JavaScript-Dateien
```

### Features

- 📰 Aktuelle Nachrichten
- 🌤️ Wetterinformationen
- 📱 Responsive Design
- 🔍 Suchfunktion
- 📞 Kontaktformular

### Entwicklung

Die Website ist eine statische HTML/CSS/JavaScript Anwendung. Änderungen können direkt in den entsprechenden Dateien vorgenommen werden.
