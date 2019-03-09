from wizard.action import *

class ActionProcessor:

    # actions = dict(x=[], y=[], z=[], a=[], b=[], g=[])

    def __init__(self, f):
        self._actions = dict(x=[], y=[], z=[], a=[], b=[], g=[])
        self._observer = f
        self._lock = False

    # def spell(self):
    #     if self.has_trend('rest', 'x', delta=5):
    #         self._clear()
    #         return 'rest'
    #     elif (self.has_trend('down', 'x') and self.has_trend('up', 'y')
    #             and self.less_than('x', -20) and self.greater_than('y', 20)):
    #         self._clear()
    #         return 'throw'
    #     else:
    #         return None

    def add_action(self, **kwargs):
        if self._lock:
            return
        # Add action to list
        for key, val in kwargs.items():
            if key in self._actions:
                self._actions[key].append(val)
        if self._actions['y'][-1] > 70:
            self._on_action_data()
        elif self._actions['x'][-1] < -70:
            self._on_action_data() 
    
    
    def _is_throw(self, dx):
        # Find the lastest index for least x
        lxpos = self._actions['x'][::-1].index(dx[0])
        lxpos = len(self._actions['x']) - 1 -lxpos
        cores_y = self._actions['y'][lxpos]
        cores_g = self._actions['g'][lxpos]
        cx = dx[0] <= -65 and cores_y > 65 and cores_g > 500
        if cx:
            print('*****Throw', dx[0], cores_y, cores_g)
        else:
            print('Not throw', dx[0], cores_y, cores_g)
        return cx

    def _is_strike(self, dy):
        # Find the lastest index
        lypos = self._actions['y'][::-1].index(dy[0])
        mypos = self._actions['y'][::-1].index(dy[1])
        cores_g = self._actions['g'][::-1][mypos]
        print(dy, 'lpos: ', lypos, 'rpos: ', mypos, 'g: ', cores_g)
        # lypos > mypos since reversed
        cy = dy[1] > 60 and dy[0] < -20 and lypos > mypos and abs(cores_g) < 500
        if cy:
            print('*****STRIKE', dy, self._actions['g'][::-1][mypos])
        else:
            print('Not strike', dy)
        return cy 


    def _on_action_data(self):
        if self._lock:
            return
        self._lock = True
        (lx, mx)  = (min(self._actions['x']), max(self._actions['x']))
        (ly, my)  = (min(self._actions['y']), max(self._actions['y']))
        (lz, mz)  = (min(self._actions['z']), max(self._actions['z']))
        if self._is_strike((ly, my)):
            self._clear()
            self._observer.action_listener(Strike())
        elif self._is_throw((lx, mx)):
            self._clear()
            self._observer.action_listener(Throw())
        print('-------')
        self._lock = False
        return


    def _clear(self):
        for key in self._actions:
            self._actions[key].clear()

#    def greater_than(self, action_name, value):
#        return max(self.actions[action_name]) >= value
#
#    def less_than(self, action_name, value):
#        return max(self.actions[action_name]) >= value
#
#    def has_trend(self, trend, action_name, delta=1):
#        """
#        :param trend: up, down, similar, concave, convex
#        :param action_name: x, y, z, a, b, g
#        :param delta: tolerable error range
#        :return boolean: True if action_name has a trend
#        """
#        if trend == 'up' or trend == 'down':
#            for i in range(1, len(self.actions[action_name])):
#                if trend == 'up' and self.actions[action_name][i] < self.actions[action_name][i - 1]:
#                    return False
#                if trend == 'down' and self.actions[action_name][i] > self.actions[action_name][i - 1]:
#                    return False
#                return True
#        elif trend == 'rest':
#            min_num, max_num = 9999, -9999
#            if len(self.actions[action_name]) < 20:
#                return False
#            for i in self.actions[action_name][-20:]:
#                if min_num > i:
#                    min_num = i
#                elif max_num < i:
#                    max_num = i
#            return abs(max_num - min_num) < delta

