from datetime import datetime

from wizard.helpers.base_model import BaseModel
from wizard.extensions import db

class Room(BaseModel):

    __tablename__ = "rooms"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    hostid = db.Column(db.String, nullable=False)

    # updated and created at
    updated_at = db.Column(db.DateTime, nullable=False, onupdate=datetime.now(), default=datetime.now())
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def __repr__(self):
        return f"<Room {self.id}>"

    def to_json(self):
        return {
            "hostid": self.hostid,
        }
