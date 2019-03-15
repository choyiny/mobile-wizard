import firebase_admin
from firebase_admin import credentials
from flask_sqlalchemy import SQLAlchemy
from config import FIREBASE_CERT_NAME


db = SQLAlchemy()

cred = credentials.Certificate(FIREBASE_CERT_NAME)
firebase_admin.initialize_app(cred)
