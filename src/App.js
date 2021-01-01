import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);       //for dropdown the country names
  const [country, setCountry] = useState("worldwide");  //tells the currently selected country
  const [countryInfo, setCountryInfo] = useState({});   //selected country info

  //API for all country data - https://disease.sh/v3/covid-19/countries
  //API for specific country data - https://disease.sh/v3/covid-19/countries/{Country_Code}
  //API for overall world data - https://disease.sh/v3/covid-19/all

  //to initialize countryInfo with worldwide data since the later function is called only upon dropdown change
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);;
    });
  }, []);

  //useEffect runs a piece of code based on a given condition
  //function for filling the dropdown box with country names
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
        });
    };

    getCountriesData();
  }, []);

  //function to handle change of data whenever a new country choosen from dropdown
  const handleCountryChange = async (event) => {

    const countryCode = event.target.value;

    const url = countryCode === "worldwide" 
    ? "https://disease.sh/v3/covid-19/all" 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
    })

  };

  // console.log(countryInfo);
  
  return (
    <div className="app">
      <Header />

      <div className="app__left">
        {/* HEADER */}
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
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
        <div className="app__stats">
          <InfoBox title="Coronavirus Caases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* MAP */}
        <div className="app__map">
          <Map />
        </div>
      </div>

      <Card className="app__right">
        <CardContent>
          {/* TABLE */}
          <h2>Live Cases by Country</h2>

          {/* GRAPH */}
          <h2>Worldwide new cases</h2>

        </CardContent>
      </Card>
    </div>
  );
}

export default App;
