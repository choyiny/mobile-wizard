from functools import wraps

from firebase_admin import auth
from flask import request, g

from wizard.models.stats import UserStats
from wizard.models.user import User


class AuthorizationError(Exception):
    pass


def login_required(f):
    """
    Decorator to check and validate Authorization header for any view
    """
    @wraps(f)
    def wrapped(*args, **kwargs):
        # Check for Authorization header in the form of "Bearer <token>"
        if "Authorization" not in request.headers:
            raise AuthorizationError("Missing Authorization header")
        id_token = request.headers.get("Authorization").split(" ")[1]

        # verify with Firebase
        decoded_token = auth.verify_id_token(id_token)
        # get our user with the uid (create if not exists)
        g.user = User.first_or_create(firebase_id=decoded_token['uid'], email=decoded_token['email'])

        # create user stats if it doesn't yet exist
        UserStats.first_or_create(firebase_id=decoded_token['uid'])
        return f(*args, **kwargs)
    return wrapped
