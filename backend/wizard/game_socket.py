import time

from flask_socketio import Namespace, emit

from wizard.action_processor import ActionProcessor


class Game(Namespace):
    """ The socket endpoint. """

    ap = ActionProcessor()

    def on_connect(self):
        print('client connected to game')

    def on_disconnect(self):
        print('client disconnected from game')

    def on_action(self, data):
        """ Method is called when an action is sent from the phone. """
        data['timestamp'] = time.time()
        self.ap.add_action(**data)
        spell = self.ap.spell()
        if spell is not None:
            emit('spell', {'spell': spell}, broadcast=True)

        emit('echo', data, broadcast=True)
