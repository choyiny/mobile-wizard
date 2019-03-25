# Mobile Wizard Backend
Credits to [answer-me](https://github.com/choyiny/answer-me) for providing a template for the setup instructions and
inspiration of backend structuring with Flask.

## Development setup

### Setup
Note: This project *requires* Python 3.6+, Docker, Docker Compose and Redis installed.

1. Create a virtual environment for the project and activate it. Run `pip3 install virtualenv` if virtualenv is not installed on Python3.6+
```
$ virtualenv wizard-venv --python=/usr/local/bin/python3
$ source wizard-venv/bin/activate
```
_Note: The virtualenv folder should be created outside of the project directory._

2. Clone the repository to your directory install the required dependencies
```
(wizard-venv) $ git clone git@github.com:UTSCC09/project-mobile-wizard.git
(wizard-venv) $ cd project-mobile-wizard/backend
(wizard-venv) $ pip install -r requirements.txt
```

### How to run locally
1. Make sure you are in your virtualenv that you setup.
```
$ source wizard-venv/bin/activate
```
2. Spin up the PostgreSQL server.
```
(wizard-venv) $ cd project-mobile-wizard/backend
(wizard-venv) $ docker-compose up -d
```
3. Start redis-server (`brew install redis` if not yet installed on Mac)
```
(wizard-venv) $ redis-server
```
_Note: The PostgreSQL server is binded to port 5433 (default port 5432) to prevent clashes with
the local PostgreSQL instance._

3. Start server with gunicorn, and binded to listen to all interfaces.
```
(wizard-venv) $ gunicorn --worker-class eventlet -w 4 wsgi:app -b 0.0.0.0:5000
```
4. You should now able to access the API with devices connected to the local internet.
```
http://[host local ip address]:5000
```

### Using the interactive shell
1. Run the interactive shell
```
(wizard-venv) $ flask shell
```
2. Import shelltools to access most common models
```
>>> from shelltools import *
```

### Database operations
Drop and recreate database
```
(wizard-venv) $ python manage.py reset
```

### (Hard) Database Reset
Rebuild Docker containers
```
$ docker-compose down -v
$ docker-compose up --build -d
```

## Production setup
Under construction.
