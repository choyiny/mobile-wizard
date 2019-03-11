import time

from flask_socketio import Namespace, emit

from wizard.action_processor import ActionProcessor

from wizard.action import *


class Game(Namespace):
    """ The socket endpoint. """

    # ap = ActionProcessor()

    def on_connect(self):
        print('client connected to game')
        self._ap = ActionProcessor(self)

    def on_disconnect(self):
        print('client disconnected from game')

    def on_action(self, data):
        """ Method is called when an action is sent from the phone. """
        # print(data)
        data['timestamp'] = time.time()
        self._ap.add_action(**data)
        #spell = self.ap.spell()
        #if spell is not None:
        #    emit('spell', {'spell': spell}, broadcast=True)
        emit('echo', data, broadcast=True)

    def on_deviceOrientationChangeEvent(self, data):
        emit("deviceOrientationChangeEvent", data, broadcast=True)

    def on_screenOrientationChangeEvent(self, data):
        emit("screenOrientationChangeEvent", data, broadcast=True)

    def action_listener(self, action):
        emit('spell', {'spell': action.name()}, broadcast=True)


