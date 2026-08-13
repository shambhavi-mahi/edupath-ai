import joblib
import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from preprocess import load_and_preprocess_data

def evaluate_model():
    filepath = "../../data/raw/uci_student_performance/student-mat.csv"
    _, X_test, _, y_test, _ = load_and_preprocess_data(filepath)
    
    model_path = "../models/student_performance_model.pkl"
    try:
        model = joblib.load(model_path)
    except FileNotFoundError:
        print("Model not found. Run train.py first.")
        return
        
    preds = model.predict(X_test)
    
    mae = mean_absolute_error(y_test, preds)
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    r2 = r2_score(y_test, preds)
    
    print("=== Model Evaluation ===")
    print(f"MAE:  {mae:.3f}")
    print(f"RMSE: {rmse:.3f}")
    print(f"R2:   {r2:.3f}")
    
    # Attempting to extract basic feature importances from pipeline
    print("\n=== Feature Importance Insights ===")
    try:
        # Get one-hot encoded feature names
        cat_names = model.named_steps['preprocessor'].named_transformers_['cat'].get_feature_names_out()
        num_names = model.named_steps['preprocessor'].named_transformers_['num'].get_feature_names_out()
        all_features = np.concatenate([num_names, cat_names])
        
        importances = model.named_steps['model'].feature_importances_
        
        fi_df = pd.DataFrame({"Feature": all_features, "Importance": importances})
        fi_df = fi_df.sort_values(by="Importance", ascending=False).head(10)
        
        print("Top 10 features influencing this prediction:")
        print(fi_df.to_string(index=False))
        print("\n*Note: These indicate influence on the model, not a strict causal relationship.")
        
    except Exception as e:
        print("Could not extract feature importances directly:", e)

if __name__ == "__main__":
    evaluate_model()
