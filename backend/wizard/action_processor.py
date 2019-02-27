class ActionProcessor:

    actions = dict(x=[], y=[], z=[], a=[], b=[], g=[])

    def spell(self):
        if self.has_trend('rest', 'x', delta=5):
            self._clear()
            return 'rest'
        elif (self.has_trend('down', 'x') and self.has_trend('up', 'y')
                and self.less_than('x', -20) and self.greater_than('y', 20)):
            self._clear()
            return 'throw'
        else:
            return None

    def add_action(self, **kwargs):
        for key, val in kwargs.items():
            if key in self.actions:
                self.actions[key].append(val)

    def _clear(self):
        for key in self.actions:
            self.actions[key].clear()

    def greater_than(self, action_name, value):
        return max(self.actions[action_name]) >= value

    def less_than(self, action_name, value):
        return max(self.actions[action_name]) >= value

    def has_trend(self, trend, action_name, delta=1):
        """
        :param trend: up, down, similar, concave, convex
        :param action_name: x, y, z, a, b, g
        :param delta: tolerable error range
        :return boolean: True if action_name has a trend
        """
        if trend == 'up' or trend == 'down':
            for i in range(1, len(self.actions[action_name])):
                if trend == 'up' and self.actions[action_name][i] < self.actions[action_name][i - 1]:
                    return False
                if trend == 'down' and self.actions[action_name][i] > self.actions[action_name][i - 1]:
                    return False
                return True
        elif trend == 'rest':
            min_num, max_num = 9999, -9999
            if len(self.actions[action_name]) < 20:
                return False
            for i in self.actions[action_name][-20:]:
                if min_num > i:
                    min_num = i
                elif max_num < i:
                    max_num = i
            return abs(max_num - min_num) < delta
