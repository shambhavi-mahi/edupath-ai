import os
import joblib
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from preprocess import load_and_preprocess_data

def train_model():
    filepath = "../../data/raw/uci_student_performance/student-mat.csv"
    X_train, X_test, y_train, y_test, preprocessor = load_and_preprocess_data(filepath)
    
    # We choose Random Forest as the strong baseline
    model = Pipeline([
        ("preprocessor", preprocessor),
        ("model", RandomForestRegressor(n_estimators=300, random_state=42))
    ])
    
    print("Training Random Forest model...")
    model.fit(X_train, y_train)
    
    # Save model
    os.makedirs("../models", exist_ok=True)
    model_path = "../models/student_performance_model.pkl"
    joblib.dump(model, model_path)
    print(f"Model successfully saved to {model_path}")
    
    return model

if __name__ == "__main__":
    train_model()
