import React, { Component } from 'react';
import './App.scss';
class App extends Component {
  constructor() {
    super();
    this.state = {
      covid19Stats: [],
      searchValue: '',
    };
  }
  componentDidMount() {
    fetch(
      'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Canada',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
          'x-rapidapi-key':
            'cbba18372fmsh11ab9e60dfeaa18p19529fjsnc7c72655e7be',
        },
      }
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response.data.covid19Stats);
        this.setState({ covid19Stats: response.data.covid19Stats });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onSearch = e => {
    this.setState({ searchValue: e.target.value });
    console.log(e.target.value);
  };
  render() {
    const { covid19Stats } = this.state;
    return (
      <div className='container'>
        <h1>COVID-19 Tracker</h1>
        <p>
          Simple UI, because it's just for keeping up to date on the current
          pandemic.
        </p>
        <input
          type='text'
          onChange={this.onSearch}
          className='search'
          placeholder='Search for your province'
        />
        <div className='flex-container'>
          {covid19Stats.map((location, index) => {
            if (this.state.searchValue === '') {
              return (
                <div key={index} className={location.province}>
                  <h2>
                    {location.province}, {location.country}
                  </h2>
                  <p>
                    Last Updated:{' '}
                    <span className='last-updated'>{location.lastUpdate}</span>
                  </p>
                  <p>
                    confirmed cases:{' '}
                    <span className='confirmed-cases'>
                      {location.confirmed}
                    </span>
                  </p>
                  <p>
                    Deaths: <span className='deaths'>{location.deaths}</span>
                  </p>
                </div>
              );
            } else {
              if (
                location.province
                  .toLowerCase()
                  .includes(this.state.searchValue.toLowerCase())
              ) {
                return (
                  <div key={index} className={location.province}>
                    <h2>
                      {location.province}, {location.country}
                    </h2>
                    <p>
                      Last Updated:{' '}
                      <span className='last-updated'>
                        {location.lastUpdate}
                      </span>
                    </p>
                    <p>
                      confirmed cases:{' '}
                      <span className='confirmed-cases'>
                        {location.confirmed}
                      </span>
                    </p>
                    <p>
                      Deaths: <span className='deaths'>{location.deaths}</span>
                    </p>
                  </div>
                );
              } else {
                return (
                  <div key={index} className={location.province + ' hidden'}>
                    <h2>
                      {location.province}, {location.country}
                    </h2>
                    <p>
                      Last Updated:{' '}
                      <span className='last-updated'>
                        {location.lastUpdate}
                      </span>
                    </p>
                    <p>
                      confirmed cases:{' '}
                      <span className='confirmed-cases'>
                        {location.confirmed}
                      </span>
                    </p>
                    <p>
                      Deaths: <span className='deaths'>{location.deaths}</span>
                    </p>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    );
  }
}

export default App;
