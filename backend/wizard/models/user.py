from wizard.extensions import db
from wizard.helpers.base_model import BaseModel


class User(BaseModel):
    __tablename__ = 'users'

    firebase_id = db.Column(db.String(125), primary_key=True)
    email = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"<User: {self.email}>"
