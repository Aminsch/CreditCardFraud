from flask import Flask, request, render_template, jsonify
import xgboost as xgb
import numpy as np

app = Flask(__name__)
model = xgb.XGBClassifier()
model.load_model('models/best_xgboost_model.json')  # Laden des Modells

@app.route('/')
def home():
    return render_template('index.html')  # Laden der HTML-Seite

@app.route('/predict', methods=['POST'])
def predict():
    # Erhalten der Feature-Daten vom POST-Request und Konvertierung in Array
    features = [float(x) for x in request.form.values()]
    final_features = np.array(features).reshape(1, -1)
    prediction = model.predict_proba(final_features)
    output = '{0:.{1}f}%'.format(prediction[0][1] * 100, 2)  #Konvertierung in Prozentsatz

    response_text = 'Die Betrugswahrscheinlichkeit liegt bei {}'.format(output)

    return jsonify({'prediction_text': response_text})


if __name__ == "__main__":
    app.run(debug=True)