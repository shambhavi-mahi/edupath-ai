import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split

def load_and_preprocess_data(filepath):
    # The UCI student dataset uses semicolons
    df = pd.read_csv(filepath, sep=";")
    
    # Target is G3, drop G1 and G2 to prevent leakage
    X = df.drop(columns=["G1", "G2", "G3"])
    y = df["G3"]
    
    categorical_cols = X.select_dtypes(include=["object"]).columns
    numeric_cols = X.select_dtypes(exclude=["object"]).columns
    
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numeric_cols.tolist()),
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols.tolist())
        ]
    )
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    return X_train, X_test, y_train, y_test, preprocessor
