import React from 'react'
import { Cards, Charts, CountryPicker } from './components'
import NavBar from '../src/components/Header/NavBar'
import styles from './App.module.css'
import { fetchData } from "./api/index";
import coronaImg from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country })
  }
  render() {
    const { data, country } = this.state;
    return (
      <>
      <NavBar />
      <div className={styles.container}>
        <img className={styles.image} src={coronaImg}/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
      </div>
      </>
    );
  }
}

export default App;
