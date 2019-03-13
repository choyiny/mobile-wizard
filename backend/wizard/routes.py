from wizard.rooms import RoomResource

def set_routes(api):
    """ Route definition for the application. """
    api.add_resource(RoomResource, '/rooms/<string:hostid>')
