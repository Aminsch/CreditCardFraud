import pandas as pd
import numpy as np
import json
import os

df = pd.read_csv('data/input/creditcard.csv')

results_folder = 'sampleResultsJson'
if not os.path.exists(results_folder):
    os.makedirs(results_folder)


# Feature-Namen für V1-V28 erstellen + Time und Amount
feature_names = [f'V{i}' for i in range(1, 29)] + ['Time', 'Amount']

user_choice = input("Möchten Sie Werte für 'no_fraud' oder 'fraud' generieren? (Bitte 'no_fraud' oder 'fraud' eingeben): ")

# Check ob User input korrekt ist
if user_choice not in ['no_fraud', 'fraud']:
    print("Ungültige Eingabe. Bitte 'no_fraud' oder 'fraud' eingeben.")
else:
    # Klasse wird erstellt basierend auf User input, dadurch kann die Textantwort mit dem numerischen Wert verglichen werden
    class_label = 0 if user_choice == 'no_fraud' else 1

    # statistische Eigenschaften der Klassen wird berechnet, dient als Basis für die Generierung von Zufallswerten
    stats = df[df['Class'] == class_label][feature_names].describe().T[['mean', 'std']]

    # Funktion zum Generieren von Zufallswerten basierend auf Mittelwert und Standardabweichung
    def generate_random_values(stats):
        return np.random.normal(stats['mean'], stats['std']).tolist()

    # Generieren Sie die Werte für V1-V28
    generated_values = generate_random_values(stats)


    filename = os.path.join(results_folder, f'{user_choice}_values.json') #Dateiname wird erstellt
    values_dict = {name: value for name, value in zip(feature_names, generated_values)} #baut dictionary auf mit feature_names und generated_values
    
    with open(filename, 'w') as f: #öffnet Datei und schreibt die Werte in die Datei
        json.dump(values_dict, f, indent=4) #indent=4 sorgt für Einrückung der Werte mit 4 Leerzeichen
    

    print(f"Die generierten Werte für '{user_choice}' wurden in '{filename}' gespeichert.")
