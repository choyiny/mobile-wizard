from wizard.extensions import db
from wizard.helpers.base_model import BaseModel


class UserDetails(BaseModel):
    __tablename__ = 'user_details'

    firebase_id = db.Column(db.String(125), db.ForeignKey('users.firebase_id'), primary_key=True)
    nickname = db.Column(db.String(20))
    fastest_game = db.Column(db.Float)
    most_damage_in_game = db.Column(db.Integer)
    most_damage_blocked_in_game = db.Column(db.Integer)

    def __repr__(self):
        return f"<UserDetails for: {self.nickname or self.firebase_id}>"

    def to_dict(self):
        return {
            'nickname': self.nickname or '',
            'fastest_game': self.fastest_game or '',
            'most_damage_in_game': self.most_damage_in_game or '',
            'most_damage_blocked_in_game': self.most_damage_blocked_in_game or ''
        }
