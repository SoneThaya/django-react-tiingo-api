import React, { useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import Chart from '../components/Chart';

//import { DateRange } from 'react-date-range';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const StockPage = () => {
    const [tickerData, setTickerData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [tickerValue, setTickerValue] = useState('');
  const [value, onChange] = useState([new Date(), new Date()]);
  const [sDate, setSDate] = useState('');
  const [eDate, setEDate] = useState('');

const formatDate = (date) => {
    let temp = String(date).split(' ');

    return `${temp[3]}-${months[temp[1]]}-${temp[2]}`;
}


  useEffect(() => {
    setSDate(formatDate(value[0]));
    setEDate(formatDate(value[1]));
  }, [eDate, sDate, formatDate])

  console.log('sDate', sDate);
  console.log('eDate', eDate);

  const months = {
      "Jan": "1",
      "Feb": "2",
      "Mar": "3",
      "Apr": "4",
      "May": "5",
      "Jun": "6",
      "Jul": "7",
      "Aug": "8",
      "Sep": "9",
      "Oct": "10",
      "Nov": "11",
      "Dec": "12"
  }

    const fetchTickerData = async () => {

        const { data } = await axios.get(`http://127.0.0.1:8000/api/stocks/${tickerValue}/${sDate}/${eDate}`);
        setTickerData(data.price);
        setHistoricalData(data.history);
        setMetaData(data.meta);
      }
      
      const handleChange = (e) => {
        setTickerValue(e.target.value);
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        fetchTickerData(tickerValue);
      }

    //console.log('value', String(value[1]).split(' '))
   
    return (
        <div>
             <header className="App-header">
        <h1>stock app</h1>
        start date: {formatDate(value[0])}
        end date: {formatDate(value[1])}
      </header>
      {historicalData.detail && <h3 style={{color: 'red'}}>{historicalData.detail}</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          Ticker Symbol:
          <input type="text" name="ticker" value={tickerValue} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {/* <DateRange
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
    /> */}
    <div>
      <DateRangePicker
        onChange={onChange}
        value={value}
      />
    </div>
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
