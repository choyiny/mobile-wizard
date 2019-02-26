import time

from flask_socketio import Namespace, emit


class Game(Namespace):
    """ The socket endpoint. """

    def on_action(self, data):
        """ Method is called when an action is sent from the phone. """
        data['timestamp'] = time.time()
        emit('echo', data, broadcast=True)
