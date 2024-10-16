import React, { useContext, useEffect, useState } from 'react'
import "./Coin.css"
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChat from '../../components/LineChat/LineChat'
const Coin = () => {
  var {currency}=useContext(CoinContext)
  var {coinId}=useParams()
  var [coinData,setCoinData]=useState()
  var [historicalData,setHistoricalData]=useState()
  var fetchCoinData=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ditKZPkuyHWkXUF9SXYpzQam'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then ( response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }
  console.log(coinData)
  useEffect(()=>{
    fetchCoinData()
    fetchHistoricalData()
  },[currency])

  var fetchHistoricalData=async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ditKZPkuyHWkXUF9SXYpzQam'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response =>setHistoricalData(response))
      .catch(err => console.error(err));
  }

 if(coinData && historicalData){
  return (
    <div className='coin'>
   
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p><strong>{coinData.name} {coinData.symbol.toUpperCase()}</strong></p>
          <div className='coin-chart'>
          <LineChat historicalData={historicalData}/>
        </div>
        </div>
       
        <div className='coin-info'>
          <ul>
            <li>crypto market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>current price</li>
            <li>{currency.Symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>market cap</li>
            <li>{currency.Symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
        </div>
    </div>
  );
 }
 else{
  return(
    <div className="spinner">
      <div className="spin"></div>
    </div>
  )
 }
}

export default Coin