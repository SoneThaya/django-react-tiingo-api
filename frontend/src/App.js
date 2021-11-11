import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StockPage from './pages/StockPage';
import CryptoPage from './pages/CryptoPage';
import { Route, NavLink, Routes } from "react-router-dom";

function App() {
  const [tickerData, setTickerData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [tickerValue, setTickerValue] = useState('');


  useEffect(() => {
    // const fetchTickerData = async () => {
    //   const { data } = await axios.get(`http://127.0.0.1:8000/api/stocks/goog/`);
    //   console.log('data ', data);
    //   setTickerData(data.price);
    //   setHistoricalData(data.history);
    //   setMetaData(data.meta);
      
    // }
    //fetchTickerData();
    console.log('meta data ', metaData);
      console.log('historical data', historicalData);
      console.log('ticker data', tickerData);
  }, [tickerData, historicalData, metaData]);

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
    <>
    <div className="container">
        <header className="d-flex py-3 justify-content-center">
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink to="stock" className="nav-link">
                Stock Page
              </NavLink>
            </li>
            <li>
              <NavLink to="crypto" className="nav-link">
                Crypto Page
              </NavLink>
            </li>
          </ul>
        </header>
      </div>

      <div className="album py-5 bg-light">
        <div className="container">
          <Routes>
            <Route path="stock" element={<StockPage />} />
            <Route path="crypto" element={<CryptoPage />} />
          </Routes>
        </div>
      </div>

    </>
  );
}

export default App;
