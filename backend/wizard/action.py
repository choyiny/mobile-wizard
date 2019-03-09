from abc import ABC, abstractmethod

class Action(ABC):
    """
    Abstract base class for action. Each action has its own name.
    """
    @abstractmethod
    def __init__(self, name):
        self._name = name
    
    def name(self):
        return self._name
        

class Attack(Action):
    """
    Abstract base class for all attack action.
    Each attack should has a damage, defense effective time range
    """
    @abstractmethod
    def __init__(self, name, damage, dfrange):
        Action.__init__(self, name)
        self._damage = damage
        self._dfrange = dfrange
    
    def damage(self):
        return self._damage
    
    def defense_timerange(self):
        return self._dfrange


class Throw(Attack):
    """
    Throw attack.
    """
    def __init__(self):
        Attack.__init__(self, 'Throw', 5, 1)


class Strike(Attack):
    """
    Strike attack.
    """
    def __init__(self):
        Attack.__init__(self, 'Strick', 10, 0.5)


if __name__ == '__main__':
    #a = Action('1')
    #b = Attack('a',1,1)
    c = Throw()
    d = Strike()
    #print(a)
    print(c.name(), c.damage(), c.defense_timerange())
    print(d.name(), d.damage(), d.defense_timerange())
    
