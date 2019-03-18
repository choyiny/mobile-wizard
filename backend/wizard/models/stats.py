from wizard.extensions import db
from wizard.helpers.base_model import BaseModel


class UserDetails(BaseModel):
    __tablename__ = 'user_details'

    firebase_id = db.Column(db.String(125), db.ForeignKey('users.firebase_id'), primary_key=True)
    nickname = db.Column(db.String(20))
    fastest_game = db.Column(db.Float)
    most_damage = db.Column(db.Integer)
    most_damage_blocked = db.Column(db.Integer)

    def __repr__(self):
        return f"<UserDetails for: {self.nickname or self.firebase_id}>"

    def update_attributes(self, nickname=None, fastest_game=None, most_damage=None, most_damage_blocked=None):
        if nickname:
            self.nickname = nickname
        if fastest_game:
            self.fastest_game = min(self.fastest_game, fastest_game) if self.fastest_game else fastest_game
        if most_damage:
            self.most_damage = max(self.most_damage, most_damage) if self.most_damage else most_damage
        if most_damage_blocked:
            self.most_damage_blocked = max(self.most_damage_blocked, most_damage_blocked) if self.most_damage_blocked else most_damage_blocked


    def to_dict(self):
        return {
            'nickname': self.nickname or '',
            'fastest_game': self.fastest_game or '',
            'most_damage': self.most_damage or '',
            'most_damage_blocked': self.most_damage_blocked or ''
        }
