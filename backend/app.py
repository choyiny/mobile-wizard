from flask import Flask
from flask_restful import Api
from flask_cors import CORS

import config as c
from wizard import routes
from wizard.error_messages import ERROR_MESSAGES
from wizard.extensions import db


def create_app():
    """
    Flask application factory.
    Initializes and returns the Flask application.

    Modeled after: http://flask.pocoo.org/docs/patterns/appfactories/

    The initialized Flask application.
    """
    # Initialize app. Flatten config_obj to dictionary.
    app = Flask(__name__)
    app.config.from_object(c)

    CORS(app, expose_headers=['Authorization'])
    api = Api(app, errors=ERROR_MESSAGES)

    # connect to databases
    with app.app_context():
        db.init_app(app)
        db.create_all()

    # Routes
    routes.set_routes(api)

    @app.shell_context_processor
    def make_shell_context():
        return dict(app=app, db=db)

    # Return the application instance.
    return app
