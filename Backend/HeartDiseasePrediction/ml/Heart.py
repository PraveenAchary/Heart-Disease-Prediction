# heart.csv
import numpy as  np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

data = pd.read_csv('Heart.csv')
# print(data.head())
# print(data.columns)
# print(data.shape)
# print(data.info())
# print(data.isna().sum())

#Data-CLeaning

# 1.Handling Null values
data['trestbps'] = data['trestbps'].fillna(data['trestbps'].median())
data['chol'] = data['chol'].fillna(data['chol'].median())
data['fbs'] = data['fbs'].fillna(data['fbs'].mode()[0])
data['restecg'] = data['restecg'].fillna(data['restecg'].mode()[0])
data['thalch'] = data['thalch'].fillna(data['thalch'].median())
data['exang'] = data['exang'].fillna(data['exang'].mode()[0])
data['oldpeak'] = data['oldpeak'].fillna(data['oldpeak'].median())
data['slope'] = data['slope'].fillna(data['slope'].mode()[0])
data['ca'] = data['ca'].fillna(data['ca'].median())
data['thal'] = data['thal'].fillna(data['thal'].mode()[0])
data['num'] = (data['num']>0).astype(int)
print(data.isna().sum())

data.drop('dataset',axis=1,inplace=True)

# 2.Handling Categorical data
#Using one hot encoding

categorical_cols = data.select_dtypes(include=['object']).columns
data = pd.get_dummies(data,columns=categorical_cols)

print(data.info())

# Since,Huge Multicollinearity exists,Lets  use Lasso Regression(L1) Here.
x = data.drop('num',axis=1)
y = data['num']

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.3,random_state=42)

#Scaling Features
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
x_train_scaled = scaler.fit_transform(x_train)
x_test_scaled = scaler.transform(x_test)


# RAndomized search cv with L1 logistic reg

from sklearn.model_selection import RandomizedSearchCV

model = LogisticRegression(penalty='l1',solver='liblinear')

param = {
    'C':[0.01,0.1,1,10,100],
    'fit_intercept':[True],
    'class_weight':[None,'balanced']
}

random_model = RandomizedSearchCV(estimator=model,param_distributions=param,n_iter=50,scoring='roc_auc',cv=5)
random_model.fit(x_train_scaled,y_train)
y_pred = random_model.predict(x_test_scaled)


from sklearn.metrics import accuracy_score,classification_report

for t in [0.5,0.45,0.4,0.35,0.3]:
    y_pred_thresh = (y_pred >= t).astype(int)
    # print(f"\nThreshold:{t}")
    # print(accuracy_score(y_test,y_pred_thresh))
    # print(classification_report(y_test,y_pred_thresh))


import joblib

joblib.dump(random_model.best_estimator_, "heart_model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(x.columns.tolist(), "features.pkl")
