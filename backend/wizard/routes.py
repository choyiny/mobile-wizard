from wizard.resources import user_resources


def set_routes(api):
    """ Route definition for the application. """
    api.add_resource(user_resources.UserResource, '/users/<string:firebase_id>')
