import pickle
import numpy as np
import joblib
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
from django.conf import settings
import pandas as pd


def load_ml():
    base_path = os.path.join(settings.BASE_DIR, "HeartDiseasePrediction", "ml")
    model = joblib.load(os.path.join(base_path, "heart_model.pkl"))
    scaler = joblib.load(os.path.join(base_path, "scaler.pkl"))
    features = joblib.load(os.path.join(base_path, "features.pkl"))
    
    return model, scaler, features


@api_view(['POST'])
def Heart_Disease_Prediction(request):
    try:
        model,scaler,features = load_ml()
        input_data = []
        for feature in features:
            value = request.data.get(feature,0)
            input_data.append(value)


        input_df = pd.DataFrame([input_data],columns=features)
        #input_array = np.array([input_data])
        input_scaled = scaler.transform(input_df)
        print("Scaled Input:", input_scaled)
        prediciton = model.predict(input_scaled)
        # print("Preiction:",prediciton)
        # prediction_prob = model.predict_proba(input_scaled)
        # pred_proba = prediction_prob
        # print("Prediction probabilities:", prediction_prob)
        if hasattr(model, "predict_proba"):
            pred_proba = model.predict_proba(input_scaled)
            prob_disease = float(pred_proba[0][1])
            prob_no_disease = float(pred_proba[0][0])
        else:
            prob_disease = None
            prob_no_disease = None
        print("Prediction:",prediciton)
        return Response({
            "Prediction":prediciton[0],
            "probability_disease": pred_proba,
            "probability_no_disease": prob_no_disease,
            "Message":"Prediction Successful!"
        })
    except Exception as e:
        return Response({"error":str(e)})