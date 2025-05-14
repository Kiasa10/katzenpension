# Katzenpension

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

Das Projekt "Katzenpension" wurde zum üben von Angular erstellt
und dient als Beispielcode für Bewerbungen von mir.

"Sonja's Katzenpension" ist eine fiktive Katzenpension, in der man seine Katzen bei Abwesenheit (Urlaub etc.)
unterbringen kann.
Die Webseite ist in unterschiedliche Ansichten aufgeteilt:

- Home
  Hier sieht man ein Bild der fiktiven Person Sonja und eine kurze Beschreibung (Beispieltext) von ihr und der Pension.

- Zimmer
  Auf dieser Ansicht sind alle Räume, welche in der Pension existieren mit einem Bild, dem Preis pro Katze pro Nacht und
  einer kurzen Beschreibung zu finden.

- Stammgäste
  Hier findet man die Stammgäste der Pension mit Namen, Alter, Foto und einer Beschreibung des Stammgastes.

- Gästebuch
  Im Gästebuch kann jeder einen Kommentar hinzufügen, wie der Aufenthalt oder die Pension empfunden wurde. Die
  Kommentare können nach Neueste/Älteste sortiert werden.

- Buchen
  Auf dieser Ansicht findet man eine Form mit der man einen Aufenthalt für seine Katze/n buchen kann. Es kann der gewünschte
  Zeitraum, das gewünschte Zimmer und die Anzahl der Katzen angegeben werden. Zusätzlich kann hier vermerkt werden,
  ob und wenn ja, welche Medikamente wann gegeben werden müssen.
  Gewisse Impfungen sind übrigends Pflicht um in der Pension einen Platz zu erhalten.

- FAQ
  Hier findet man die am häufigsten gestellten Fragen, welche mit Hilfe eines Akkordeons dargestellt werden.

Webseite starten

Es muss MongoDB installiert sein.

-> mongod.exe starten

in VS Code:

im 1. Terminalfenster:
-> npm i
-> cd backend
-> node seeds.js (Testdaten einspielen)
-> npm start

im 2. Terminalfenster:
-> npm i
-> npm start
-> auf http://localhost:4200/ gehen

Bildquellen:

- Favicon
  https://www.clipartmax.com/middle/m2H7d3d3A0m2K9m2_png-file-cat-icon-transparent-background/

- Homescreen
  https://unsplash.com/de/fotos/frau-tragt-katze-wahrend-sie-auf-der-veranda-steht-2_KjpNXFl5M

- PageNotFound
  https://www.clipartmax.com/middle/m2i8d3A0b1d3H7m2_cute-cartoon-cat-cat-head-clip-art/

- Katzenbilder
  meine Fotos

- Zimmerbilder
  Bilder mit Hilfe von Bing Image Creator erstellt
