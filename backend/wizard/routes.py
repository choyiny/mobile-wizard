from wizard.rooms import RoomResourceB, RoomResourceA

def set_routes(api):
    """ Route definition for the application. """
    api.add_resource(RoomResourceA, '/rooms/', '/rooms')
    api.add_resource(RoomResourceB, '/rooms/<string:hostid>')
