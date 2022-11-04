import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./converter.component.css"
import CURRENCY_DATA from '../../currency-data.json'
import { useState, useEffect } from "react";
import Date from "../Date/date.component";

import CURRENCY from '../../currency.json'

const arrow_icon = require('../../assets/exchange3.png')


const Converter = () => {

    const curr1_default = {
            "id": 148,
            "CurrencyName": "United States Dollar",
            "CurrencyCode": "USD",
            "CountryName": "United States"
    }
    const curr2_default = {
        "id": 66,
        "CurrencyName": "Indian Rupee",
        "CurrencyCode": "INR",
        "CountryName": "India"
    }

    function isEmptyObject(obj){
        return JSON.stringify(obj) === '{}'
    }

    const [val1, setVal1] = useState()
    const [val2, setVal2] = useState()
    const [curr1, setCurr1] = useState(curr1_default)
    const [curr2, setCurr2] = useState(curr2_default)
    const [currencyNow, updatecurrencyNow] = useState({})
    const [date, updateDate] = useState("")

    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b880d2fb55mshb3ea1421ad36653p18ecafjsn9090079798ff',
                'X-RapidAPI-Host': 'currencyscoop.p.rapidapi.com'
            }
        };
        
        await fetch('https://currencyscoop.p.rapidapi.com/latest', options).then(response => response.json())
            .then((response) => {
                // console.log(response)
                updatecurrencyNow(response)
                let dateNow = response.response.date
                updateDate(dateNow);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchData()
        
    }, [])

    // console.log(CURRENCY)

    setInterval(() => {
        fetchData()
    }, 600000);

    // console.log(curr1, curr2)

    const onCurr1Change = (event) => {
        // console.log(typeof event.toString())
        setCurr1(event)
        // console.log(curr1.CurrencyName, curr2)

    }
    const onCurr2Change = (event) => {
        setCurr2(event)

    }

    const onChangeHandler1 = (event) => {
        setVal1(event.target.value)
        // console.log(event.target.value)
        console.log(val1, val2)
        if(!isEmptyObject(currencyNow)){
            // console.log(currencyNow.response.rates[CURRENCY_DATA[curr1.CurrencyName]])
            let curr1_val = currencyNow.response.rates[CURRENCY_DATA[curr1.CurrencyName]]
            let curr2_val = currencyNow.response.rates[CURRENCY_DATA[curr2.CurrencyName]]
            
            // console.log(typeof curr2_val)
            let curr2_converted = (curr2_val/curr1_val)*(+event.target.value)
            setVal2(curr2_converted)
            // console.log(val2)
        }
    }
    const onChangeHandler2 = (event) => {
        setVal2(event.target.value)
        console.log(event.target.value)
        if(!isEmptyObject(currencyNow)){
            let curr1_val = currencyNow.response.rates[CURRENCY_DATA[curr1.CurrencyName]]
            let curr2_val = currencyNow.response.rates[CURRENCY_DATA[curr2.CurrencyName]]
            // console.log(curr1_val, curr2_val)
            let curr1_converted = (curr1_val/curr2_val)*(+event.target.value)
            setVal1(curr1_converted)
        }
    }
    const swap = () => {
        setCurr1(curr2)
        setCurr2(curr1)
        setVal1(val2)
        setVal2(val1)
    }
    return(
        <div>
            <div className="converter">

            <DropdownList
                className="el1"
                // defaultValue={curr1}
                value={curr1}
                data={CURRENCY}
                dataKey='id'
                textField='CurrencyName'
                renderListItem = {({item}) => 
                (<div>
                    <img src={`https://countryflagsapi.com/png/${item.CountryName}`} 
                        alt="" 
                        srcset="" 
                        height="20px" 
                        width="30px" />
                    <div>
                        {item.CurrencyName}
                    </div>
                </div>)}
                onChange={onCurr1Change}
            />

            <div className="el2"><img onClick={swap}  src={arrow_icon} alt="" srcset="" height="40px" width="40px"/></div>
            

            <DropdownList
                className="el3"
                // defaultValue={curr1}
                value={curr2}
                data={CURRENCY}
                dataKey='id'
                textField='CurrencyName'
                renderListItem = {({item}) => 
                (<div>
                    <img src={`https://countryflagsapi.com/png/${item.CountryName}`} 
                        alt="" 
                        srcset="" 
                        height="20px" 
                        width="30px" />
                    <div>
                        {item.CurrencyName}
                    </div>
                </div>)}
                onChange={onCurr2Change}
            />

            <input 
            className="el4" 
            type="number" 
            name="" 
            id="val1" 
            onChange={onChangeHandler1} 
            value={val1} 
            placeholder="Enter Amount"/>

            <input 
            className="el5" 
            type="number" 
            name="" 
            id="val2" 
            onChange={onChangeHandler2} 
            value={val2}
            placeholder="Enter Amount"/>
        </div>
        <Date className="el6" date={date}/>
    </div>
        
    )
}
export default Converter;