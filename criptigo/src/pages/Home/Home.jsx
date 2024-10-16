import React, { useContext, useEffect, useState } from 'react'
import "./Home.css"
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
    var {allCoin,currency}=useContext(CoinContext)
    var [displayCoin,setDisplayCoin]=useState([])
    var [input,setInput]=useState('')
    var inputHandler=(event)=>{
        setInput(event.target.value)
        if(event.target.value==""){
            setDisplayCoin(allCoin)
        }
       
    }
    var serachHandler=async(event)=>{
        event.preventDefault()
       var serachedCoin= await allCoin.filter((item)=>{
           return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(serachedCoin)
        // setInput('')
    }


    useEffect(()=>{
        setDisplayCoin(allCoin)
    },[allCoin])

  return (
    <div className='home'>
        <div className='hero'>
            <h1>Largest Crypto MarketPlace</h1>
            <p>Welcome to the worlds largest crypto currency marketplace signUp to explore more about Crypto</p>
            <form onSubmit={serachHandler}>
                <input onChange={inputHandler} value={input} list='coinList'  required type="text" placeholder='search Crypto...' name="" id="" />
                <datalist id='coinList'>
                    {allCoin.map((item,index)=>(
                        <option value={item.name} key={index}/>
                    ))}
                </datalist>
                <button type='submit'>search</button>
            </form>
        </div>
        <div className='cryto-table'>
            <div className='table-layout'>
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p>24 change</p>
                <p className='market-cap'>market cap</p>
            </div>
            {
                displayCoin.slice(0,15).map((item,index)=>(
                    <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt="" />
                            <p>{item.name+' - ' + item.symbol}</p>
                        </div>
                        <p>{currency.Symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h > 0? "green":'red'}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                        <p className='market-cap'>{currency.Symbol} {item.market_cap}</p>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default Home