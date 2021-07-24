# Libraries and dependencies
from flask import render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import json
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
Country = Base.classes.country
GeoData = Base.classes.geodata

session =Session(engine)

app = Flask(__name__)
#telling Flask not to order alphabetically our json
app.config['JSON_SORT_KEYS'] = False

@app.route("/")
def index():
    print("Server received request for 'Home' page...")
    #print(country)
    #return (f"<h1>Home page for the Olympics dashboard API, available routes:</h1></br>")
    return render_template("index.html")

# Filter by year
@app.route("/<year>")
def year_query(year):
    year_data = session.query(Sports.index, Sports.country_code, Sports.medal, Sports.medal_value, Sports.athlete, Sports.sport, Sports.gender)\
        .filter(Sports.year == int(year))
     # Building the dictionary
    row = 0
    start_list = []
    for _ in year_data:
        start_list.append({'countryCode': year_data[row][1], 
                            'medal': year_data[row][2],
                            'medalValue': year_data[row][3],
                            'athlete': year_data[row][4],
                            'sport': year_data[row][5],
                            'gender': year_data[row][6],
                            'id': year_data[row][0]})
        row += 1

    return jsonify(start_list)

# Country geoJSON
@app.route("/country")
def country_query():
    country_data = session.query(Country.country, Country.country_code, Country.gdp_1960, Country.gdp_1964, Country.gdp_1968,
    Country.gdp_1972, Country.gdp_1976, Country.gdp_1980, Country.gdp_1984, Country.gdp_1988, Country.gdp_1992, Country.gdp_1996,
    Country.gdp_2000, Country.gdp_2004, Country.gdp_2008, Country.latitude, Country.longitude, Country.geometry)
    
    row = 0
    country_list = []
    #geometry = str(country_data[row][17])
    for _ in country_data:
        country_list.append({   
            'features':[
                {
                    'type': "Feature",
                    'properties':{
                        'country_code':country_data[row][1],
                        'country':country_data[row][0], 
                        'gdp_1960':country_data[row][2], 
                        'gdp_1964':country_data[row][3], 
                        'gdp_1968': country_data[row][4],
                        'gdp_1972': country_data[row][5], 
                        'gdp_1976': country_data[row][6], 
                        'gdp_1980': country_data[row][7], 
                        'gdp_1984': country_data[row][8],  
                        'gdp_1988': country_data[row][9],
                        'gdp_1992': country_data[row][10], 
                        'gdp_1996': country_data[row][11], 
                        'gdp_2000': country_data[row][12], 
                        'gdp_2004': country_data[row][13], 
                        'gdp_2008': country_data[row][14], 
                        'latitude':country_data[row][15], 
                        'longitude':country_data[row][16] 
                    },
                        'geometry':json.loads(country_data[row][17])
                }],
                })
        row += 1
     
    return jsonify(country_list)

# Country geoJSON

@app.route("/geoData")
def countryMedals_query():
    geoData = session.query(GeoData.country_code, GeoData.latitude, GeoData.longitude, GeoData.sport, GeoData.athlete, GeoData.gender, func.sum(GeoData.medal_value),).group_by(GeoData.country_code).all()
    
    row = 0
    geodata_list  = []
    #geometry = str(country_data[row][17])
    for _ in geoData:
         geodata_list.append({   
            'features':[
                {
                    'type': "Feature",
                    'properties':{
                        'country_code':geoData [row][0],
                        'medal_sum':geoData [row][6], 
                        'latitude':geoData [row][1], 
                        'longitude':geoData [row][2],
                        'sport':geoData [row][3],
                        'athlete':geoData [row][4],
                        'gender':geoData [row][5] 
                    },
                }],
                })
         row += 1
     
    return jsonify(geodata_list)

# Medals info unfiltered
@app.route("/medals")
def medals_query():
    print ("query started")
    row = 0
    medals_info = session.query(Sports.country_code, Sports.year, func.sum(Sports.medal_value)).group_by(Sports.year, Sports.country_code).all()
    
    medals_list = []
    for a in medals_info:
        medals_list.append({'countryCode':a[0], 
                            'year': a[1],
                            'medalValue': a[2]})
    
    return jsonify(medals_list)

        
session.close()
if __name__ == "__main__":
    app.run(debug=True)