# This file is used by gunicorn to run the server on Docker.
from app import create_app
from eventlet import wsgi
import eventlet

app = create_app()
if __name__ == '__main__':
    wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
