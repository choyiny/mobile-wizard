from functools import wraps

from firebase_admin import auth
from flask import request, g

from wizard.models.user import User


def login_accepted(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        # Check for Authorization header in the form of "Bearer <token>"
        if "Authorization" in request.headers:
            id_token = request.headers.get("Authorization").split(" ")[1]
            # verify with Firebase
            decoded_token = auth.verify_id_token(id_token)
            # get our user with the uid (create if not exists)
            g.user = User.first_or_create(firebase_id=decoded_token['uid'], email=decoded_token['email'])
        return f(*args, **kwargs)
    return wrapped
