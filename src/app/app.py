from flask import Flask, request, render_template, jsonify
import xgboost as xgb
import numpy as np

app = Flask(__name__)
model = xgb.XGBClassifier()
model.load_model('models/best_xgboost_model.json')  # Laden Sie Ihr Modell

@app.route('/')
def home():
    return render_template('index.html')  # Eine einfache HTML-Form für die Benutzereingabe

@app.route('/predict', methods=['POST'])
def predict():
    # Erhalten der Feature-Daten vom POST-Request
    features = [float(x) for x in request.form.values()]
    final_features = np.array(features).reshape(1, -1)
    prediction = model.predict_proba(final_features)
    output = '{0:.{1}f}%'.format(prediction[0][1] * 100, 2)  # Konvertierung in Prozentsatz

    return jsonify({'prediction_text': 'Betrugswahrscheinlichkeit: {}'.format(output)})

if __name__ == "__main__":
    app.run(debug=True)