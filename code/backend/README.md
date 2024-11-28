Softwarearchitektur von Backend:

1. Austausch der Daten zwischen Frontend und Backend soll durch JSON format erfolgen. Dieser wird durch POST-Methode von beiden
   Seite erfolgt.

2. Unsere Backend-POST-Endpunkte sehen folgendermaßen aus:

   - localhost:5001/
     - /sorting
       - /mergesort
       - /quicksort
       - /bubblesort
       - /selectionsort
     - /tree (zukünftig)

3. Von Frontend gesendetes JSON Objekt sieht z.B. wiefolgt aus:

   ```json
   { "startArray": [1, 2, 3, 4, 5, 6, 7, 8, 9] }
   ```

4. Es wird immer nur das startArray gesendet, egal ob man "check" oder "check All" klickt.

5. Von Backend gesendetes JSON Objekt ist wie Folgendes:

   - Wenn mergeSort verwendet wird:

   ```json
   {
      "processList": [[startList], [sortStep1], [sortStep2], ...],
      "mergeRange": [null, [start1, end1], [start2, end2], ...],
      "pivotElement": null
   }
   ```

   - oder, wenn QuickSort verwendet wird:

   ```json
   {
      "processList": [[startList], [sortStep1], [sortStep2], ...],
      "mergeRange": null,
      "pivotElement": [null, [pivot-before1, pivot-after1], [pivot-before2, pivot-after2], ...]
   }
   ```

   dabei gibt `[start1, end1]` den Start- und End-Index der Elemente an, die in dem ersten Merge-Schritt gemerged werden und `[pivot-before1, pivot-after1]` den Index des Pivot-Elements vor und nach dem ersten sortier Schritt an.

   Wenn "mergeRange" und "pivotElement" den Wert null besitzen heißt das, dass ein anderer Sortiealgorithmus benutzt wurde.

Edge Cases:
Falls

- a. startArray mehr als 20 Elemente hat

oder

- b. POST-Methode für falsches Link aufgerufen wurde (z.B POST-Methode für Link localhost:5001/sorting/sldkjsdlkf)

,gibt Backend JSON Datei

```json
{ "processList": [[]] }
```

mit Array ohne Elemente

Falls es eine Veränderung bei Namen/Struktur vorkommt, passe diese README.md dementsprechend bitte an.
