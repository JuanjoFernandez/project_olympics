CREATE TABLE sports (
	index SERIAL PRIMARY KEY,
	year INT NOT NULL,
	sport VARCHAR NOT NULL,
	discipline VARCHAR NOT NULL,
    athlete VARCHAR NOT NULL,
	country_code VARCHAR NOT NULL,
	gender VARCHAR NOT NULL,
	event VARCHAR NOT NULL,
	medal VARCHAR NOT NULL,
	medal_value INT NOT NULL
);

CREATE TABLE country (
country VARCHAR(100),
country_code varchar(100) PRIMARY KEY,
gdp_1960 float NOT NULL,
gdp_1964 float NOT NULL,
gdp_1968 float NOT NULL,
gdp_1972 float NOT NULL,
gdp_1976 float NOT NULL,
gdp_1980 float NOT NULL,
gdp_1984 float NOT NULL,
gdp_1988 float NOT NULL,
gdp_1992 float NOT NULL,
gdp_1996 float NOT NULL,
gdp_2000 float NOT NULL,
gdp_2004 float NOT NULL,
gdp_2008 float NOT NULL
);

SELECT * FROM sports;
SELECT * FROM country;