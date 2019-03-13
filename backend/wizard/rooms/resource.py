import datetime

from flask_restful import Resource, reqparse

from wizard.rooms.models import Room



class RoomResource(Resource):

    def get(self, hostid):
        return [x.to_json() for x in Room.query.filter_by(hostid=hostid).all()]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('hostid')
        args = parser.parse_args()

        hostid = args['hostid']
        room = Room.where(hostid=hostid).first()
        if not room:
            print(f"Room {hostid} doesnt exist, creating")
            Room.create(hostid=hostid)
        else:
            # we're keeping rooms alive for at most 10 minutes
            if datetime.now() - room.created_at > datetime.timedelta(minutes=10):
                print(f"Room {hostid} exists but overwriting")
                room.created_at = args['timestamp']
            else:
                print(f"Room {hostid} exists, not old enough to overwrite")

    def delete(self, hostid):
        Room.find_by_or_404(hostid=hostid).delete()

