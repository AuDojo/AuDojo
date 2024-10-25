Author:Minseo

Angenommene Softwarearchitektur:

1. Austausch der Daten zwischen Frontend und Backend soll durch JSON format erfolgen. Dieser wird durch POST-Methode von beiden
Seite erfolgt.

2. Unsere Webseiteverzeichnis sieht wie folgendes aus:
localhost:5001/
   /sorting
      /mergesort
      /quicksort
      /bubblesort
   /tree (zukünftig) 

3. Von Frontend gesendetes JSON Objekt ist wie Folgendes:

{ "startArray": [1,2,3,4,5,6,7,8,9] } (zum Beispiel)

4. Es wird nur startArray gesendet, egal ob man "check" oder "check All" klickt. 

5. Von Backend gesendetes JSON Objekt ist wie Folgendes:
{
   "0":[Schritte 1],
   "1":[Schritte 2],
   "2":[Schritte 3],
   ...
   "n":[Schritte n]
}
key ist ein Index für Schritten beim Algorithmus

\*\*Falls startArray mehr als 20 Elemente hat, gibt Backend leeres Array "[]" zurück. In dem Fall ist JSON Datei leer: {}

Falls es eine Veränderung bei Namen/Struktur vorkommt, passe diese README.md dementsprechend bitte an.
