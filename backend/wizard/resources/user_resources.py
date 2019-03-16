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
        """
        PATCH /users/<firebase_id>
        """
        if g.user.firebase_id != firebase_id:
            raise AuthorizationError('No Permissions to update resource')

        parser = reqparse.RequestParser()
        parser.add_argument("nickname", type=str)
        parser.add_argument("fastest_game", type=float)
        parser.add_argument("most_damage", type=int)
        parser.add_argument("most_damage_blocked", type=int)
        user_details_args = parser.parse_args()

        user_details: UserDetails = UserDetails.find_by(firebase_id=firebase_id)
        user_details.update_attributes(**user_details_args)
        user_details.save()

        return user_details.to_dict()
