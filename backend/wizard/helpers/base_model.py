from wizard.exceptions import ResourceDoesNotExist
from wizard.extensions import db


class BaseModel(db.Model):
    """
    Stores useful helper methods for interacting with db.Model
    """
    __abstract__ = True

    @classmethod
    def create(cls, **kwargs):
        """ Create a cls object and commit object to database. """
        item = cls(**kwargs)
        db.session.add(item)
        db.session.commit()
        return item

    @classmethod
    def first_or_create(cls, **kwargs):
        """ Select first cls that matches by kwargs, and create it if it doesn't exist. """
        return cls.query.filter_by(**kwargs).first() or cls.create(**kwargs)

    @classmethod
    def where(cls, **kwargs):
        """ Select a query of cls by kwargs"""
        return cls.query.filter_by(**kwargs)

    @classmethod
    def find_by(cls, **kwargs):
        """ Select first of cls by kwargs """
        return cls.query.filter_by(**kwargs).first()

    @classmethod
    def find_by_or_404(cls, **kwargs):
        """ Select first of cls by kwargs, and raises ResourceDoesNotExist if it cannot be found. """
        model = cls.find_by(**kwargs)
        if model is None:
            raise ResourceDoesNotExist('Resource not found.')
        return model

    def save(self):
        """ Save self attributes to database """
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

