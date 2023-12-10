# Requirements for the Credit Card Fraud Detection Application

## **Funktionale Anforderungen**

### 1. Betrugserkennungsleistung
Der implementierte Algorithmus muss eine Mindesterkennungsrate von 75% für Betrugsfälle aufweisen.

**Hintergrundinformationen:**
Die hohe Erkennungsrate ist entscheidend, um finanziellen Verlust zu minimieren und die Integrität der Kreditkartentransaktionen sicherzustellen.

### 2. Datenimport-Flexibilität
Nutzern muss es möglich sein, Daten manuell einzugeben oder durch Import von JSON- oder CSV-Dateien zu übertragen.

**Hintergrundinformationen:**
Flexibilität in der Dateneingabe unterstützt verschiedene Benutzerpräferenzen und Arbeitsabläufe.

### 3. Lokaler Dateiimport
Für den Import von JSON- und CSV-Dateien soll die Anwendung das Einladen von Dateien aus lokalen Speicherquellen unterstützen.

**Hintergrundinformationen:**
Die Einbindung lokaler Dateiquellen erleichtert den Datentransfer und verbessert die Benutzererfahrung.

### 4. Betrugshistorie-Feedback
Benutzer sollen eine Rückmeldung erhalten, falls bei einem Kreditkarteninhaber bereits in der Vergangenheit betrügerische Transaktionen aufgefallen waren.

**Hintergrundinformationen:**
Informationen über frühere Betrugsfälle sind wichtig für Risikobewertung und Entscheidungsfindung.

### 5. Hilfefunktion
Ein Hilfe-Knopf soll für Nutzer jederzeit verfügbar sein, um Supportanfragen zu stellen.

**Hintergrundinformationen:**
Ein Hilfe-Knopf fördert effiziente Nutzung und verbessert die Benutzererfahrung.

### 6. Abmeldefunktion
Nutzern soll die Möglichkeit geboten werden, sich nach erfolgreicher Anmeldung aus der Anwendung abzumelden.

**Hintergrundinformationen:**
Sichere Abmeldefunktionen erhöhen die Sicherheit und Kontrolle über die Benutzerdaten.

### 7. Anzeige der Betrugswahrscheinlichkeit
Nach dem Datenimport soll die Wahrscheinlichkeit eines Betrugs dem Benutzer angezeigt werden, mit einer speziellen Warnung, falls diese über 33% liegt.

**Hintergrundinformationen:**
Die Anzeige der Betrugswahrscheinlichkeit ermöglicht eine schnelle Risikobewertung und Entscheidungsfindung.

### 8. Datenlöschung
Nutzer sollen die Möglichkeit haben, jeglichen Input und Output über einen 'Löschen'-Button zu entfernen; dieser Löschvorgang sollte weniger als 1 Sekunde dauern.

**Hintergrundinformationen:**
Schnelle Löschfunktionen erhöhen die Datenkontrolle und Sicherheit.

## **Qualitätsanforderungen**

### 9. Datenschutzkonformität
Die Datenübertragung und -verarbeitung muss vollständig konform mit der EU-Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz (BDSG) sein.

**Hintergrundinformationen:**
Der Schutz persönlicher Daten und die Sicherheit der Datenverarbeitung sind gemäß den gesetzlichen Bestimmungen unerlässlich.

### 10. Skalierbarkeit des Techstacks
Der verwendete Technologiestack muss die Möglichkeit bieten, die Anwendung bei Bedarf zu skalieren.

**Hintergrundinformationen:**
Eine skalierbare Technologieplattform ist notwendig, um zukünftiges Wachstum und erhöhte Datenmengen zu bewältigen.

### 11. Unterstützung von Sicherheitsstandards
Das System sollte standardmäßig HTTPS oder vergleichbare Sicherheitsprotokolle verwenden.

**Hintergrundinformationen:**
Die Verwendung sicherer Protokolle schützt die Vertraulichkeit und Integrität übertragener Daten.

### 12. Reaktionszeit der Anwendung
Die Verarbeitung und Bereitstellung von Ergebnissen soll innerhalb von maximal 1 Sekunde erfolgen.

**Hintergrundinformationen:**
Eine schnelle Reaktionszeit der Anwendung steigert die Effizienz und Benutzerzufriedenheit.

## **Randbedingungen**

### 13. Zugangskontrolle
Der Zugang zur Anwendung ist ausschließlich berechtigten Nutzern vorbehalten, die sich zuvor eindeutig identifiziert haben.

**Hintergrundinformationen:**
Strenge Zugangskontrollen verhindern unbefugten Zugriff und Missbrauch der Anwendung.

### 14. Verwenden eines Python Frameworks
Die Anwendung soll mit einem Python Framework entwickelt werden.

**Hintergrundinformationen:**
Die Verwendung eines Python Frameworks ermöglicht eine schnelle Entwicklung und einfache Wartung, sowie eine einfache Integration mit Machine Learning Bibliotheken.