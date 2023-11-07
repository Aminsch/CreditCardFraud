# CreditCardFraud

## Introduction
Dieses Repository dient dafür alle Artifakte des Software Projekts im Modul Machine Learning in der Anwendung zu sammeln.
Das Softwareprokjekt hat als Basis einen Datensatz von Kaggle, welcher Kreditkartentransaktionen beinhaltet.
Ziel des Projekts ist es, ein Modell zu entwickeln, welches Kreditkartenbetrug erkennen kann und somit einen echten Mehrwert für eine Bank darstellt.

## Aufbau Repository
Das Repository ist in folgende Ordner aufgeteilt:
- `data/input`: Enthält den Datensatz, welcher von Kaggle heruntergeladen wurde.
- `models`: Enthält einen JSON Export des besten mit XGboost erstellten Models
- `src/app`: Enthält den Source Code der Applikation sowie das HTML File (`src/app/templates/index.html`) für die Visualisierung.
- `src/dataGen`: Enthält den Source Code für die Generierung der Beispieldaten.
- `src/dataGen/sampleResultsJson`: In diesem Ordner werden die Ergebnisse der Beispiel Resultate gespeichert.
- `dokumentationProjekt`: In diesem Ordner finden sich weitere Dokumentation für das Machine Learning Projekt wie die Architektur oder die Requierenments


## Notizen 
Website aufhübschen
Probieren mit Over oder Undersampling der Daten den Recall zuoptiemieren
Visualisieren, wei die Optimierung kommt -> warum wurde kennzahl xy optimiert