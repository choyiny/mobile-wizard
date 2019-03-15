from flask import g
from flask_restful import Resource, reqparse

from wizard.helpers.security import login_required, AuthorizationError
from wizard.models.stats import UserDetails


class UserResource(Resource):

    @login_required
    def get(self, firebase_id: str):
        """
        GET /users/<firebase_id>/
        """
        if g.user.firebase_id != firebase_id:
            raise AuthorizationError('No Permissions to view resource')

        return UserDetails.first_or_create(firebase_id=firebase_id).to_dict()

    @login_required
    def patch(self, firebase_id: str):
        if g.user.firebase_id != firebase_id:
            raise AuthorizationError('No Permissions to view resource')

        parser = reqparse.RequestParser()
        parser.add_argument("nickname", type=str, required=True)
        args = parser.parse_args()

        user_details: UserDetails = UserDetails.find_by(firebase_id=firebase_id).to_dict()
        user_details.nickname = args.get('nickname')
        user_details.save()

        return user_details.to_dict()

