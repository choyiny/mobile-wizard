from wizard.resources import user_resources, room_resources, home_resources


def set_routes(api):
    """ Route definition for the application. """
    api.add_resource(home_resources.HomeResource, '/')

    api.add_resource(
        user_resources.UserStatsResource,
        '/users/<string:firebase_id>/stats'
    )
    api.add_resource(
        user_resources.UserResource,
        '/users/<string:firebase_id>'
    )

    api.add_resource(room_resources.CreateRoomResource, '/rooms')
    api.add_resource(room_resources.RoomResource, '/rooms/<string:room_id>')
