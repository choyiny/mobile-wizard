"""
Modelled after Django's manage.py.
"""
import sys

from app import create_app
from wizard.extensions import db

if __name__ == '__main__':
    # create app using factory
    app = create_app()
    if sys.argv[1] == "reset":
        with app.app_context():
            db.drop_all()
            db.create_all()
    else:
        print("Invalid argument.")
