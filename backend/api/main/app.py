from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient
from tools import JsonResp
from jose import jwt
import os
import pymongo
# Import Routes
from project.routes import project_blueprint


def create_app():
    # Flask Configguration
    app = Flask(__name__)
    app.config.from_pyfile("config/config.cfg")
    app.config['CORS_HEADERS'] = 'Content-Type'
    CORS(app, supports_credentials=True)

    # Database Configguration
    try:
        db_name = app.config["MONGO_DATABASE_NAME"]
        mongoPassword = app.config["MONGO_PASSWORD"]
        mongosUser = app.config["MONGO_USER"]
        port = app.config["MONGO_PORT"]

        mongo = MongoClient(
            f'mongodb://{mongosUser}:{mongoPassword}@localhost:{port}')
        app.db = mongo[db_name]

    except pymongo.errors.ServerSelectionTimeoutError as err:
        print("Error while attempting to connect to Database")

    # Register Blueprints
    app.register_blueprint(project_blueprint, url_prefix="/projects")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host=app.config["FLASK_DOMAIN"],
            port=app.config["FLASK_PORT"], debug=app.config["DEBUG"])
