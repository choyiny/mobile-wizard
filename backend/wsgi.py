# This file is used by gunicorn to run the server on Docker.
from app import create_app
app = create_app()
if __name__ == '__main__':
    app.run()
