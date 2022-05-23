import React from "react";
import { fetchData } from "./api";
import { Cards, Charts, CountryPicker } from "./components";
import cvdImg from "./images/image.png";
import "./App.css";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  countryChangeHandler = async (country) => {
    const fetchedData = await fetchData(country);
    console.log(fetchedData);
    console.log(country);
    this.setState({ data: fetchedData, country: country });
  };

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data: data });
  }

  render() {
    const { data, country } = this.state;
    return (
      <div className="container">
        <img src={cvdImg} alt="" className="cvdImg" />
        <Cards data={data} />
        <CountryPicker countryChangeHandler={this.countryChangeHandler} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}

export default App;
