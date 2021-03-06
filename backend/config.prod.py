# SQLAlchemy configurations
from secrets import token_hex

SQLALCHEMY_ECHO = False  # do not show SQL statements
SQLALCHEMY_TRACK_MODIFICATIONS = False  # suppress warnings
SQLALCHEMY_DATABASE_URI = "postgresql://postgres:wizard@wizard-postgres:5432/wizard"
SECRET_KEY = token_hex(32)
FIREBASE_CERT_NAME = "project-mobile-wizard-firebase-adminsdk-6bmre-c67afcaefa.json"
REDIS_HOST = "wizard-redis"
REDIS_PORT = "6379"
REDIS_DB = "0"
FRONTEND_URL = "https://game.projectmobilewizard.com"
