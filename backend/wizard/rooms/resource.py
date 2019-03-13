from datetime import datetime, timedelta
from flask_restful import Resource, reqparse

from wizard.rooms.models import Room



class RoomResourceB(Resource):

    def get(self, hostid):
        return Room.find_by_or_404(hostid=hostid).to_json()

    def delete(self, hostid):
        Room.find_by_or_404(hostid=hostid).delete()


class RoomResourceA(Resource):
    def get(self):
        return [x.to_json() for x in Room.query.filter_by().all()]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('hostid')
        args = parser.parse_args()

        print(f"Creating Room...")
        hostid = args['hostid']
        room = Room.first_or_create(hostid=hostid)
        # we're keeping rooms alive for at most 10 minutes
        if datetime.now() - room.created_at > timedelta(minutes=10):
            print(f"Room {hostid} exists but overwriting")
            room.created_at = datetime.now()
        else:
            print(f"Room {hostid} exists, not old enough to overwrite")
        return room.to_json()


