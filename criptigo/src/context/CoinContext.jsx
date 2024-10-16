import { createContext, useEffect, useState } from "react";

export var CoinContext=createContext()

var CoinContextProvider=(props)=>{
    var [allCoin,setAllCoin]=useState([])
    var [currency,setCurrency]=useState({
        name:'usd',
        Symbol:'$'
    })
    var fetchCoin=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ditKZPkuyHWkXUF9SXYpzQam'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response =>setAllCoin(response))
           
            .catch(err => console.error(err));
            console.log(allCoin)
    }

    useEffect(()=>{
        fetchCoin()
    },[currency])
    var ContectValue={
        allCoin,currency,setCurrency
    }
    return(
        <CoinContext.Provider value={ContectValue}>
            {props.children}
        </CoinContext.Provider>
    )

}
export default CoinContextProvider