from flask import Flask, request, render_template, jsonify
import xgboost as xgb
import numpy as np

app = Flask(__name__)
model = xgb.XGBClassifier()
model.load_model('mein_projekt/models/best_model.json')  # Laden des Modells

@app.route('/')
def home():
    return render_template('index.html')  # Laden der HTML-Seite

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print("Recieved data:", data)
    if not data:
        return jsonify({'error': 'Keine Daten erhalten'}), 400

    feature_names = ['Time', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17', 'V18', 'V19', 'V20', 'V21', 'V22', 'V23', 'V24', 'V25', 'V26', 'V27', 'V28', 'Amount']
    features = [data.get(feature, 0) for feature in feature_names]  # Fallback auf 0, wenn kein Wert vorhanden ist

    # Konvertieren Sie alle Werte zu Floats
    try:
        features = [float(x) for x in features]
    except ValueError as e:
        return jsonify({'error': f'Ungültiger Wert im Feature-Array: {e}'}), 400

    final_features = np.array(features).reshape(1, -1)

    # Führen Sie die Vorhersage durch
    prediction = model.predict_proba(final_features)
    output = '{0:.{1}f}%'.format(prediction[0][1] * 100, 2)
    response_text = 'Die Betrugswahrscheinlichkeit liegt bei {}'.format(output)
    print(response_text)  # Fügen Sie dies hinzu, um die Ausgabe zu sehen
    return jsonify({'prediction_text': response_text})




if __name__ == "__main__":
    app.run(debug=True)