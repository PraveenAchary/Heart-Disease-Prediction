❤️ Heart Disease Prediction System
Full-Stack Machine Learning Web Application

A production-style full-stack web application that predicts the likelihood of heart disease using clinical parameters. The system integrates a trained scikit-learn model with a React frontend and a Django REST Framework (DRF) backend, delivering real-time predictions with probability scores.

🚀 Project Overview

This application enables users to input key cardiovascular health metrics and receive an ML-powered prediction indicating the presence or absence of heart disease.

The project demonstrates:

End-to-end ML model deployment

Backend API design for model inference

Frontend–backend integration

Real-world feature preprocessing consistency

Clean, modular, scalable architecture

🧠 Machine Learning Pipeline

Model Workflow

Data preprocessing & feature selection

Feature scaling using a trained StandardScaler

Model training using scikit-learn

Model serialization using joblib

Deployment-ready inference endpoint

Inference Flow

Model, scaler, and feature list are loaded dynamically.

Input data is aligned to the exact training feature order.

Data is scaled before prediction.

Output includes both:

Binary classification

Probability scores via predict_proba

This ensures consistency, reproducibility, and production safety.

🏗️ System Architecture
Frontend — React

Functional components with Hooks (useState)

Interactive sliders & controlled form inputs

Real-time UI updates

Axios-based REST API communication

Conditional result rendering with dynamic styling

Backend — Django + DRF

RESTful API endpoint for predictions

Structured JSON responses

Exception handling for inference errors

Model artifact management

Data validation and transformation

ML Artifacts

heart_model.pkl – Trained classification model

scaler.pkl – Pre-fitted feature scaler

features.pkl – Ordered feature list for inference consistency

⚙️ Tech Stack

Frontend

React

Axios

CSS

Backend

Django

Django REST Framework

Pandas

NumPy

Joblib

Machine Learning

Scikit-learn

🔌 API Design
Endpoint

POST /api/predict/

Request Body
{
  "name": "John",
  "sex": 1,
  "cp": 2,
  "trestbps": 140,
  "chol": 250,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 1.2,
  "slope": 1,
  "ca": 0,
  "thal": 2
}

Response
{
  "Prediction": 1,
  "probability_disease": 0.82,
  "probability_no_disease": 0.18,
  "Message": "Prediction Successful!"
}

📁 Project Structure
HeartDiseasePrediction/
│
├── frontend/                 # React Application
│
├── backend/
│   ├── api/
│   │   └── views.py          # Prediction API
│   │
│   ├── ml/
│   │   ├── heart_model.pkl
│   │   ├── scaler.pkl
│   │   └── features.pkl
│
└── README.md

✨ Key Engineering Decisions

Feature Order Preservation: Prevents training–inference mismatch.

Serialized Scaler: Guarantees consistent preprocessing.

Probability Output: Improves interpretability over raw classification.

Separation of Concerns: Clear distinction between UI, API, and ML layers.

Extensible Architecture: Easily replace model without modifying frontend.

🔒 Production Considerations (Next Steps)

Authentication & rate limiting

Input validation layer (DRF serializers)

Logging & monitoring

Model versioning

Docker containerization

Cloud deployment (AWS / Render / Railway)

Model explainability (SHAP / LIME)

🎯 Why This Project Matters

This project demonstrates the practical skills required to deploy machine learning systems in real-world environments:

Bridging data science and backend engineering

Designing scalable APIs

Handling ML artifacts in production

Building user-facing ML applications

📜 License

For educational and portfolio purposes.
