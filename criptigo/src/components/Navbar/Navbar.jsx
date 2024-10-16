import React, { useContext } from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.png"
import arrow_icon from "../../assets/arrow_icon.png"
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  var {setCurrency}=useContext(CoinContext)
  var currencyHandler=(event)=>{
    switch(event.target.value){
      case "usd":{
        setCurrency({name:"usd",Symbol:'$'})
        break
      }
      case "inr":{
        setCurrency({name:"inr",Symbol:'₹'})
        break
      }case "eur":{
        setCurrency({name:"eur",Symbol:'€'})
        break
      }
      default:{
        setCurrency({name:'usd',Symbol:"$"})
        break
      }
    }
  }
  return (
    <div className='navbar'>
       <Link to={'/'}> <img src={logo} alt="" className='logo' /></Link>
       
        <div className='nav-right'>
            <select name="" id="" onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="eur">EUR</option>
            </select>
            <button>Sign Up <img src={arrow_icon} alt="" /></button>
        </div>
        
    </div>

     
  )
}

export default Navbar