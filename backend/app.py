from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_socketio import SocketIO

import config as c
from wizard.game_socket import Game
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

    CORS(app, expose_headers=['Authorization'], resources={r'/rooms/*': {'origins': '*'}})
    api = Api(app, errors=ERROR_MESSAGES)

    # setup socket server
    socketio = SocketIO(app)
    game = Game('/game')
    socketio.on_namespace(game)

    # connect to databases
    with app.app_context():
        db.init_app(app)
        db.create_all()

    # Routes
    routes.set_routes(api)

    # used for `flask shell` command
    @app.shell_context_processor
    def make_shell_context():
        # make below variables accessible in the shell for testing purposes
        return {
            'app': app,
            'db': db
        }

    return app
