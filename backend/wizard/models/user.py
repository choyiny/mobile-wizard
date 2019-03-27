from wizard.extensions import db
from wizard.helpers.base_model import BaseModel


class User(BaseModel):
    __tablename__ = 'users'

    firebase_id = db.Column(db.String(125), primary_key=True)
    email = db.Column(db.Text, nullable=False)
    nickname = db.Column(db.String(60))

    def assign_attributes(self, nickname=None):
        if nickname:
           self.nickname = nickname

    def __repr__(self):
        return f"<User: {self.nickname or self.email}>"

    def to_dict(self):
        return {
            'nickname': self.nickname or ''
        }
