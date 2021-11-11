import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Chart from '../components/Chart';

const CryptoPage = () => {
    const [metaData, setMetaData] = useState([]);
    const [pData, setPData] = useState([]);
  const [tickerValue, setTickerValue] = useState('');

    const fetchTickerData = async () => {

        const { data } = await axios.get(`http://127.0.0.1:8000/api/stocks/crypto/${tickerValue}/`);
        console.log('data ', data);
        // setTickerData(data.price);
        // setHistoricalData(data.history);
        setMetaData(data.ticker[0].ticker);
        setPData(data.ticker[0].priceData);
        console.log('meta data ', metaData);
        //   console.log('historical data', historicalData);
        //   console.log('ticker data', tickerData);
      }
      
      const handleChange = (e) => {
        setTickerValue(e.target.value);
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        fetchTickerData(tickerValue);
      }
      console.log('meta data ', metaData);
      console.log('p data ', pData);
    return (
        <div>
              <header className="App-header">
        <h1>crypto app</h1>
      </header>
    
      <form onSubmit={handleSubmit}>
        <label>
          Ticker Symbol:
          <input type="text" name="ticker" value={tickerValue} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {metaData && (
        <div>
          <h2>Ticker: {metaData}</h2>
          {/* <h3>Name: {metaData.name}</h3> */}
        </div>
      )}
      {/* {metaData && (
        <div>
          <ul>
            <li>Close: $</li>
            <li>High: $</li>
            <li>Low: $</li>
            <li>Open: $</li>
            <li>Date: {moment().format('MM/DD/YYYY')}</li>
            <li>Volume: </li>
          </ul>
        </div>
      )} */}
      <Chart data={pData} />
        </div>
    )
}

export default CryptoPage
