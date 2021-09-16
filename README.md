
## Project manager Test App

## Requirements: 
- Python3 3.8.10 +
- Node v16.4.2 +
- Docker compose 3.0+

## Run Mongo DB container

Inside mongo-container:

> docker-compose up --build -d mongodb

## Set-up python dependencies and run Flask app:

Install virtualenv 
> pip3 install virtualenv

Inside backend/ run:
> virtualenv pythonenv

Execute the newly created virtualenv by running:
> source ./pythonenv/bin/activate

Install the packages inside the environment:
> pip3 install -r requirements.txt

## Run the Backend (port 5000):
> python3 api/main/app.py

Populate the DB by sending a get request to the endpoint
> GET /projects/import_data 

... A table view will appear in the console with the following columns: (Id, Project Name, Total kW, WTG numbers, Months acquired) ... and a xlsx file (filtered_projects.xslx) will be generated inside backend/output containing only the projects with an acquisition_date bigger than 11 months (including records with null values).

## Frontend

Install npm dependencies:

... Inside frontend run:
> npm install

Run the development server:
> npm start

## REST-API Endpoints
> GET /projects/get will return a given project based on the given id, example:

GET /projects/get?id=jk3290id23;ldk3p

> GET /projects/all will return all the projects stored in the DB.


> POST /projects/add will add a new project record into the DB, example:

    { "project_name": "test name,
     "total_kw": 213122,
     "WTG_numbers": ["test1", "test2"],
     "project_group_id": "TEST1,
    "project_status_id": "Completed,
    "project_deal_type_id": "TEST2,
     "acquisition_date": "2015-10-09" }

> PUT /projects/update will update one record with the given params, example:

    { "project_name": "test name11,
     "total_kw": 334,
     "WTG_numbers": ["ACE3", "DF23"],
     "project_group_id": "ACCT,
    "project_status_id": "Started,
    "project_deal_type_id": "TEST22,
     "acquisition_date": "2015-10-09" }


> DELETE /projects/delete will delete records based on a id array, example:

    "projects":["a68bea59c11d441ba22fc3791ed90be7"]




