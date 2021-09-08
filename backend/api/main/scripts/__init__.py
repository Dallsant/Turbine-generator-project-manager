import datetime
import time
import csv
import os
import xlsxwriter
from flask import current_app as app
import tools

# Calculates the number of months since date of acquisition using the server's current date


def calculate_months_acquired(string):
    try:
        date = string.split("-")
        start_year = int(date[0])
        start_month = int(date[1])
        start_day = int(date[2])
        start_date = datetime.datetime(start_year, start_month, start_day)
        today = datetime.date.today()
        today = today.strftime("%Y-%m-%d").split("-")
        end_date = datetime.datetime(
            int(today[0]), int(today[1]), int(today[2]))
        num_months = (end_date.year - start_date.year) * \
            12 + (end_date.month - start_date.month)
        return num_months
    except Exception as err:
        print("Invalid date, returning 0")
        return 0


def filter_by_months_acquired(projects_dict, amount_of_months):
    newDict = dict()
    for key, project in projects_dict.items():
        if project["months_acquired"] > amount_of_months:
            pass
        else:
            newDict[key] = project
    return newDict


def export_to_db(projects_dict):
    db = app.db.projects
    for project in projects_dict.values():
        db.update_one(
            {"project_id": project["id"]},
            {"$set": {
                "id": tools.randID(),
                "project_id": project["id"],
                "created_at": tools.nowDatetimeUTC(),
                "project_name": project["project_name"],
                "total_kw": project["total_kw"],
                "WTG_numbers": project["WTG_numbers"],
                "months_acquired": project["months_acquired"],
                "display_WTG_numbers": "; ".join(project["WTG_numbers"]),
                "acquisition_date": project["acquisition_date"],
                "project_deal_type_id": project["project_deal_type_id"],
                "project_group_id": project["project_group_id"],
                "project_status_id": project["project_status_id"],
            }},
            upsert=True
        )


def export_to_xls(projects_dict, output_name):

    # Create a workbook and add a worksheet.
    workbook = xlsxwriter.Workbook(output_name)
    worksheet = workbook.add_worksheet()

    # Set-upHeaders
    worksheet.write(0, 0,     "Id")
    worksheet.write(0, 1,     "Project Name")
    worksheet.write(0, 2,     "Total kW ")
    worksheet.write(0, 3,     "WTG numbers ")
    worksheet.write(0, 4,     "Months acquired ")

    current_row = 1

    # Iterates over the data and write it out row by row.
    for project_data in projects_dict.values():
        worksheet.write(current_row, 0, project_data["id"])
        worksheet.write(current_row, 1, project_data["project_name"])
        worksheet.write(current_row, 2, project_data["total_kw"])
        worksheet.write(current_row, 3, ";".join(project_data["WTG_numbers"]))
        worksheet.write(current_row, 4, project_data["months_acquired"])

        current_row += 1
    workbook.close()


def print_table_view(hash_table):
    print(f'Id | Project Name | Total kW | WTG numbers | Months acquired')
    for index, project in hash_table.items():
        id = project["id"]
        project_name = project["project_name"]
        total_kw = str(project["total_kw"])
        wtg_numbers = ";".join(project["WTG_numbers"])
        months_acquired = str(project["months_acquired"])
        complete_row = f'{id} | {project_name} | {total_kw} | {wtg_numbers} | {months_acquired}'
        sepatation = "-" * len(complete_row)
        print(sepatation)
        print(complete_row)


def access_csv_data():
    hash_table = {}

    # Creates dictionary indexes based on projects Ids
    with open('Datasets/Project_raw_table.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        headers = []
        for row in csv_reader:
            if line_count == 0:
                headers = row
            else:
                project_id = row[0]
                hash_table[project_id] = {
                    "id": row[0],
                    "project_name": row[1],
                    "total_kw": 0, "WTG_numbers": [],
                    "acquisition_date": row[3],
                    "project_deal_type_id": row[5],
                    "project_status_id": row[7],
                    "project_group_id": row[6],
                    "months_acquired": calculate_months_acquired(row[3])
                }
            line_count += 1

    # Assigns Wind turbine generators to the Projects in the dictionary based on their project Id
    with open('Datasets/WTG_raw_table.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                pass
            else:
                hash_table[row[1]]["WTG_numbers"].append(row[0])
                hash_table[row[1]]["total_kw"] += (float(row[4]))

            line_count += 1

    print_table_view(hash_table)
    filtered_data = filter_by_months_acquired(hash_table, 11)
    export_to_xls(filtered_data, "output/filtered_projects.xlsx")
    export_to_db(hash_table)
    return [hash_table, filtered_data]
