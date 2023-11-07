from flask import Flask, request, render_template, jsonify
import xgboost as xgb
import numpy as np

app = Flask(__name__)
model = xgb.XGBClassifier()
model.load_model('models/best_model.json')  # Laden des Modells

@app.route('/')
def home():
    return render_template('index.html')  # Laden der HTML-Seite

@app.route('/predict', methods=['POST'])
def predict():
    # Erhalten der Feature-Daten vom POST-Request
    features = [float(x) for x in request.form.values()] #Konvertierung in Float  
    final_features = np.array(features).reshape(1, -1) #Konvertierung in Array mit 1 Zeile und n Spalten
    prediction = model.predict_proba(final_features) #Vorhersage der Wahrscheinlichkeit 
    output = '{0:.{1}f}%'.format(prediction[0][1] * 100, 2)  #Konvertierung in Prozentsatz

    response_text = 'Die Betrugswahrscheinlichkeit liegt bei {}'.format(output)

    return jsonify({'prediction_text': response_text})


if __name__ == "__main__":
    app.run(debug=True, port=8000)