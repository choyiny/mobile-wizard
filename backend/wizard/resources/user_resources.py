from flask import g
from flask_restful import Resource, reqparse

from wizard.helpers.security import login_required, AuthorizationError
from wizard.models.stats import UserStats
from wizard.models.user import User


class UserResource(Resource):

    @login_required
    def get(self, firebase_id: str):
        """
        GET /users/<firebase_id>
        """
        if g.user.firebase_id != firebase_id:
            raise AuthorizationError('No Permissions to view resource')

        return User.find_by_or_404(firebase_id=firebase_id).to_dict()

    @login_required
    def patch(self, firebase_id: str):
        """
        PATCH /users/<firebase_id>
        """
        if g.user.firebase_id != firebase_id:
            raise AuthorizationError('No Permissions to update resource')

        parser = reqparse.RequestParser()
        parser.add_argument("nickname", type=str)
        user_details_args = parser.parse_args()

        user: User = User.find_by(firebase_id=firebase_id)
        user.assign_attributes(**user_details_args)
        user.save()

        return user.to_dict()


class UserStatsResource(Resource):

    @login_required
    def get(self, firebase_id: str):
        """
        GET /users/<firebase_id>/stats
        """
        if g.user.firebase_id != firebase_id:
            raise AuthorizationError('No Permissions to view resource')

        return UserStats.first_or_create(firebase_id=firebase_id).to_dict()

    @login_required
    def patch(self, firebase_id: str):
        """
        PATCH /users/<firebase_id>/stats
        """
        if g.user.firebase_id != firebase_id:
            raise AuthorizationError('No Permissions to update resource')

        parser = reqparse.RequestParser()
        parser.add_argument("fastest_game", type=float)
        parser.add_argument("most_damage", type=int)
        parser.add_argument("most_damage_blocked", type=int)
        user_details_args = parser.parse_args()

        user_stats: UserStats = UserStats.find_by(firebase_id=firebase_id)
        user_stats.assign_attributes(**user_details_args)
        user_stats.save()

        return user_stats.to_dict()
