import React, { useEffect, useState } from "react";
import { fetchData } from "./api";
import { Cards, Charts, CountryPicker } from "./components";
import cvdImg from "./images/image.png";
import "./App.css";

const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("second");

  const countryChangeHandler = async (country) => {
    const fetchedData = await fetchData(country);
    setData(fetchedData);
    setCountry(country);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    };
    fetchAPI();
  }, []);

  return (
    <div className="container">
      <img src={cvdImg} alt="" className="cvdImg" />
      <Cards data={data} />
      <CountryPicker countryChangeHandler={countryChangeHandler} />
      <Charts data={data} country={country} />
    </div>
  );
};

export default App;
