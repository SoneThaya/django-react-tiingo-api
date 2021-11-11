import React, { useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import Chart from '../components/Chart';

const StockPage = () => {
    const [tickerData, setTickerData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [tickerValue, setTickerValue] = useState('');

    const fetchTickerData = async () => {

        const { data } = await axios.get(`http://127.0.0.1:8000/api/stocks/${tickerValue}/`);
        console.log('data ', data);
        setTickerData(data.price);
        setHistoricalData(data.history);
        setMetaData(data.meta);
        console.log('meta data ', metaData);
          console.log('historical data', historicalData);
          console.log('ticker data', tickerData);
      }
      
      const handleChange = (e) => {
        setTickerValue(e.target.value);
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        fetchTickerData(tickerValue);
      }

    return (
        <div>
             <header className="App-header">
        <h1>stock app</h1>
      </header>
      {historicalData.detail && <h3 style={{color: 'red'}}>{historicalData.detail}</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          Ticker Symbol:
          <input type="text" name="ticker" value={tickerValue} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {metaData && (
        <div>
          <h2>Ticker: {metaData.ticker}</h2>
          <h3>Name: {metaData.name}</h3>
        </div>
      )}
      {tickerData[0] && (
        <div>
          <ul>
            <li>Close: ${tickerData[0].close}</li>
            <li>High: ${tickerData[0].high}</li>
            <li>Low: ${tickerData[0].low}</li>
            <li>Open: ${tickerData[0].open}</li>
            <li>Date: {moment(tickerData[0].date).format('MM/DD/YYYY')}</li>
            <li>Volume: {tickerData[0].volume}</li>
          </ul>
        </div>
      )}
      <Chart data={historicalData} />
        </div>
    )
}

export default StockPage
