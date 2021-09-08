from flask import Blueprint
from flask import current_app as app
from project.models import Project
from flask_cors import CORS, cross_origin
from flask import Flask, request

project_blueprint = Blueprint("project", __name__)


@project_blueprint.route("/import_data", methods=["GET"])
@cross_origin()
def import_data():
    return Project().import_data()


@project_blueprint.route("/get", methods=["GET"])
@cross_origin()
def get_project():
    return Project().get_project()


@project_blueprint.route("/all", methods=["GET"])
@cross_origin()
def get_projects():
    return Project().all()


@project_blueprint.route("/add", methods=["POST"])
@cross_origin()
def add():
    return Project().add()


@project_blueprint.route("/delete", methods=["DELETE"])
@cross_origin()
def delete():
    return Project().delete()


@project_blueprint.route("/update", methods=["PUT"])
@cross_origin()
def update():
    return Project().update()
