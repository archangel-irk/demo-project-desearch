import React, { Component } from 'react';
import axios from 'axios';
import {
  find,
  round,
} from 'lodash';
import logo from './assets/images/logo-desearch.svg';
import arrow from './assets/images/arrow.svg';
import iconBTC from './assets/images/BTC.svg';
import iconETH from './assets/images/ETH.svg';
import iconXRP from './assets/images/XRP.svg';
import iconBCH from './assets/images/BCH.svg';
import iconLTC from './assets/images/LTC.svg';
import iconADA from './assets/images/ADA.svg';
import iconNEO from './assets/images/NEO.svg';
import iconXLM from './assets/images/XLM.svg';
import iconEOS from './assets/images/EOS.svg';
import iconXMR from './assets/images/XMR.svg';
import quick_search from './quick_search.json';
import './App.css';


const ICONS = {
  BTC: iconBTC,
  ETH: iconETH,
  XRP: iconXRP,
  BCH: iconBCH,
  LTC: iconLTC,
  ADA: iconADA,
  NEO: iconNEO,
  XLM: iconXLM,
  EOS: iconEOS,
  XMR: iconXMR,
};

class Currency {
  constructor(json) {
    const extraInfo = find(quick_search, { symbol: json.symbol });

    this.id = extraInfo.id;
    this.icon = ICONS[json.symbol];
    this.name = extraInfo.name;
    this.symbol = json.symbol;
    this.price = json.price;
    this.change = json.change;
    this.changeRounded = round(json.change, 2);
    this.isIncrease = json.change > 0;
    this.isDecrease = json.change < 0;
  }
}

const CURRENCIES = ['BTC','ETH','XRP','BCH','LTC','ADA','NEO','XLM','EOS','XMR'];


class App extends Component {
  constructor() {
    super();
    this.state = {
      /**
       * @type {Array<Currency>}
       */
      rates: [],
    };
  }

  componentDidMount () {
    axios.get(`/api/rates/v2?t=${CURRENCIES.join(',')}`)
      .then((response) => {
        this.setState({
          rates: response.data.rates.map(rate => new Currency(rate)),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <table className="App-intro">
          <thead>
            <tr>
              <th colSpan={3} className="text-left">
                Popular Coins <img style={{padding: '0px 5px'}} src={arrow} className="arrow" alt="" />
              </th>
              <th className="text-right font-light-weight">24h</th>
              <th className="text-right font-light-weight">USD</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rates.map((rate, i) => (
              <tr key={rate.id}>
                <td className="text-left">{i + 1}</td>
                <td><img src={rate.icon} className="currency-icon" alt="currency icon" /></td>
                <td className="text-left">{rate.name}</td>
                <td className="text-right">
                  {rate.isIncrease &&
                    <div className="change-increase">
                      ↑ {rate.changeRounded}%
                    </div>
                  }
                  {rate.isDecrease &&
                    <div className="change-decrease">
                      ↓ {rate.changeRounded}%
                    </div>
                  }
                  {!rate.isIncrease && !rate.isDecrease &&
                    <div className="change-plain">
                      {rate.changeRounded}%
                    </div>
                  }
                </td>
                <td className="text-right currency-value">{rate.price}</td>
              </tr>
            ))}
            {this.state.rates.length === 0 &&
              <tr>
                <td colSpan={5}>Нет данных</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
