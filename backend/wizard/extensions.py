import firebase_admin
from firebase_admin import credentials
from flask_sqlalchemy import SQLAlchemy
from redis import Redis

from config import FIREBASE_CERT_NAME, REDIS_HOST, REDIS_PORT, REDIS_DB

db = SQLAlchemy()

cred = credentials.Certificate(FIREBASE_CERT_NAME)
firebase_admin.initialize_app(cred)

redis_store = Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)
