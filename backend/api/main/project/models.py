# -*- coding: utf-8 -*-
import json
import socket
import requests
import tools
from bson.json_util import dumps
from flask import Flask
from flask import current_app as app
from flask import request
from jose import jwt
from scripts import access_csv_data, calculate_months_acquired


class Project:

    def __init__(self):
        self.db = app.db.projects
        self.defaults = {
            "id": tools.randID(),
            "project_id": "",
            "project_name": "",
            "total_kw": 0,
            "WTG_numbers": "",
            "months_acquired": "",
            "project_group_id": "",
            "project_status_id": "",
            "project_deal_type_id": "",
            "acquisition_date": "",
            "WTG_numbers": "",
            "display_WTG_numbers": "",
            "created_at": tools.nowDatetimeUTC(),
        }

    def import_data(self):
        data = access_csv_data()
        resp = tools.JsonResp(
            {"all_projects": [value for value in data[0].values()], "filtered_projects": data[1]}, 200)
        return resp

    def get_project(self):
        id = request.args.get('id')
        project = self.db.find_one({"id": id}, {
            "_id": 0,
        })
        resp = tools.JsonResp({"project": project}, 200)
        return resp

    def all(self):
        projects = self.db.find({}, {
            "_id": 0,
        })
        resp = tools.JsonResp({"projects": list(projects)}, 200)
        return resp

    def add(self):
        params = json.loads(request.data)
        print(params["WTG_numbers"])

        self.defaults.update({
            "project_id": params["project_id"],
            "project_name": params["project_name"],
            "total_kw": params["total_kw"],
            "WTG_numbers": params["WTG_numbers"],
            "months_acquired": calculate_months_acquired(params["acquisition_date"]),
            "project_group_id": params["project_group_id"],
            "project_status_id": params["project_status_id"],
            "project_deal_type_id": params["project_deal_type_id"],
            "acquisition_date": params["acquisition_date"],
            "display_WTG_numbers": "; ".join(params["WTG_numbers"]),
        })
        new_project = self.defaults

        project = self.db.update_one(
            {"id": params["project_id"]},
            {"$set": new_project},

            upsert=True
        )

        resp = tools.JsonResp({"project": new_project}, 200)
        return resp

    def delete(self):
        params = json.loads(request.data)
        # id = request.args.get('id')
        self.db.delete_many({"id": {"$in": params["projects"]}})
        return tools.JsonResp({"message": "Project/s removed"}, 200)

    def update(self):
        params = json.loads(request.data)
        params["display_WTG_numbers"] = "; ".join(params["WTG_numbers"])
        self.defaults.update(params)
        self.db.replace_one({"id": params["id"]}, params, True)
        project = self.defaults
        return tools.JsonResp({"project": project}, 200)
