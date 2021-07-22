# Libraries and dependencies

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from config import password

# Create an engine that allow us to to communicate with the database
engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/project_olympics')

# Reflect an existing database into a new model
Base = automap_base()

# Reflect the tables
Base.prepare(engine, reflect=True)

# Saving the country table
Sports = Base.classes.sports

session =Session(engine)

app = Flask(__name__)

@app.route("/")
def index():
    print("Server received request for 'Home' page...")
    #print(country)
    return (f"<h1>Home page for the Olympics dashboard API, available routes:</h1></br>")
    

# Filter by year
@app.route("/<year>")
def year_query(year):
    year_data = session.query(Sports.index, Sports.country_code, Sports.medal, Sports.medal_value)\
        .filter(Sports.year == int(year))
     # Building the dictionary
    row = 0
    start_list = {}
    for _ in year_data:
        start_list[year_data[row][0]] = {'countryCode': year_data[row][1], 
                                    'medal': year_data[row][2],
                                    'medalValue': year_data[row][3]}
        row += 1

    return jsonify(start_list)

# Country geoJSON
# @app.route("/country")
# def country_query():
    
#     return jsonify(country_list)

if __name__ == "__main__":
    app.run(debug=True)