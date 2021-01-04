import React, { useState, useEffect } from "react";
import "./Worldwide.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, printNumerical } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]); //for dropdown the country names
  const [country, setCountry] = useState("worldwide"); //tells the currently selected country
  const [countryInfo, setCountryInfo] = useState({}); //selected country info
  const [tableData, setTableData] = useState([]); //stores countries data to display cases in descending order
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 77 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  //API for all country data - https://disease.sh/v3/covid-19/countries
  //API for specific country data - https://disease.sh/v3/covid-19/countries/{Country_Code}
  //API for overall world data - https://disease.sh/v3/covid-19/all

  //to initialize countryInfo with worldwide data since the later function is called only upon dropdown change
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  //useEffect runs a piece of code based on a given condition
  //function for filling the dropdown box with country names & for countries in map
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          setCountries(
            data.map((c) => ({
              name: c.country,
              code: c.countryInfo.iso2,
            }))
          );

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  //function to handle change of data whenever a new country choosen from dropdown
  const handleCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
        setMapZoom(4);
      });
  };

  // console.log(countryInfo);

  return (
    <div>
      <div className="worldwide">
        <div className="worldwide__left">
          {/* HEADER */}
          <div className="worldwide__header">
            <h1>Worldwide Coronavirus Statistics</h1>
            <FormControl className="worldwide__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={handleCountryChange}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.code}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* INFO-BOX */}
          <div className="worldwide__stats">
            <InfoBox
              active={casesType === "cases"}
              title="Total Coronavirus Cases"
              cases={printNumerical(countryInfo.todayCases)}
              total={printNumerical(countryInfo.cases)}
              onClick={(e) => setCasesType("cases")}
            />
            <InfoBox
              isGreen
              active={casesType === "recovered"}
              title="Total Recovered Cases"
              cases={printNumerical(countryInfo.todayRecovered)}
              total={printNumerical(countryInfo.recovered)}
              onClick={(e) => setCasesType("recovered")}
            />
            <InfoBox
              isGrey
              active={casesType === "deaths"}
              title="Total Deaths"
              cases={printNumerical(countryInfo.todayDeaths)}
              total={printNumerical(countryInfo.deaths)}
              onClick={(e) => setCasesType("deaths")}
            />
          </div>

          {/* MAP */}
          <div className="worldwide__map">
            <Map
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
            />
          </div>
        </div>

        <Card className="worldwide__right">
          <CardContent>
            {/* TABLE */}
            <h2>Live Cases by Country</h2>
            <Table countries={tableData} />

            {/* GRAPH */}
            <h2 className="worldwide__graphTitle">Worldwide new {casesType}</h2>
            <LineGraph className="worldwide__graph" casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
