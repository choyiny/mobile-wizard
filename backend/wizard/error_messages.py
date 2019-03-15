"""
See: https://flask-restful.readthedocs.io/en/0.3.5/extending.html#custom-error-handlers
"""
ERROR_MESSAGES = {
    'ResourceDoesNotExist': {
        'message': "A resource with that ID no longer exists.",
        'status': 404,
        'extra': "Any extra information you want.",
    },
    'AuthorizationError': {
        'message': 'You do not have permission to view the resource.',
        'status': 403
    }
}
