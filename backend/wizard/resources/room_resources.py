import random
import string
from json import dumps, loads
from secrets import token_hex

from flask import request
from flask_restful import Resource, reqparse

from wizard.exceptions import ResourceDoesNotExist
from wizard.extensions import redis_store
from wizard.helpers.security import AuthorizationError


class CreateRoomResource(Resource):
    """
    /rooms
    """
    def post(self):
        """
        Create a room.
        """
        parser = reqparse.RequestParser()
        parser.add_argument("id", type=str)  # host id
        args = parser.parse_args()

        # auto generate room id of 4 characters long
        room_id = ''.join(
            random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(4)
        )
        store_result = redis_store.get(room_id)
        while store_result is not None:
            room_id = ''.join(
                random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(4)
            )
            store_result = redis_store.get(room_id)

        # therefore we have obtained a unique room id, store it in redis
        password = token_hex(16)
        redis_store.set(room_id, dumps({'host_id': args.get('id'), 'delete_password': password}))

        return {'my_room_id': room_id, 'delete_password': password}


class RoomResource(Resource):
    """
    /rooms/<string:room_id>
    """

    def get(self, room_id):
        """
        Get a room's peer host id.
        """
        room = redis_store.get(room_id)
        if room is None:
            # raise 404
            raise ResourceDoesNotExist('Resource not found.')
        else:
            room = loads(room)
            return {'host_id': room.get('host_id')}

    def delete(self, room_id):
        """
        Delete a room from public listing.
        """
        # Check for Authorization header in the form of "Bearer <token>"
        if "Authorization" not in request.headers:
            raise AuthorizationError("No password specified")
        temp_pass = request.headers.get("Authorization").split(" ")[1]

        room = redis_store.get(room_id)
        if room is not None:
            room = loads(room)

            if room.get('delete_password') == temp_pass:
                redis_store.delete(room_id)
                return {'success': True}
            else:
                raise AuthorizationError("Wrong one time password for host.")
        else:
            # raise 404
            raise ResourceDoesNotExist('Resource not found.')
