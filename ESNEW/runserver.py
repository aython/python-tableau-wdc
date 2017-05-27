"""
This script runs the ESNEW application using a development server.
"""

from os import environ
from ESNEW import app

if __name__ == '__main__':
    HOST = environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(environ.get('SERVER_PORT', '5558'))
    except ValueError:
        PORT = 5558
    app.run(HOST, PORT)
