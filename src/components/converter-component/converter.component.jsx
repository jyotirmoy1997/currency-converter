import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./converter.component.css"
import CURRENCY_DATA from '../../currency-data.json'
import { useState, useEffect } from "react";
import Date from "../Date/date.component";
import axios from "axios";

import CURRENCY from '../../currency.json'

const arrow_icon_1 = require('../../assets/exchange3.png')
const arrow_icon_2 = require('../../assets/exchange3_2.png')


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

    const [val1, setVal1] = useState('')
    const [val2, setVal2] = useState('')
    const [curr1, setCurr1] = useState(curr1_default)
    const [curr2, setCurr2] = useState(curr2_default)
    const [currencyNow, updatecurrencyNow] = useState({})
    const [date, updateDate] = useState("")
    const [arrow_icon, setIcon] = useState(arrow_icon_1)

    const fetchData = async () => {

        const options = {
            method: 'GET',
            url: 'https://exchangerate-api.p.rapidapi.com/rapid/latest/USD',
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_API_KEY ,
              'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
            }
          };
          
          try {
              const response = await axios.request(options);
              updatecurrencyNow(response.data.rates)
              let dateNow = response.data.time_last_update_utc
              updateDate(dateNow);
          } catch (error) {
              console.error(error);
          }
    }

    useEffect(() => {
        fetchData()
        
    }, [])

    useEffect(() => {
        window.addEventListener("resize", () => {
            if(window.innerWidth <= 900){
                setIcon(arrow_icon_2)
            }
            else if(window.innerWidth > 900){
                setIcon(arrow_icon_1)
            }
        })
    })


    setInterval(() => {
        fetchData()
    }, 600000);



    const onCurr1Change = (event) => {
        setCurr1(event)
    }
    const onCurr2Change = (event) => {
        setCurr2(event)

    }

    const onChangeHandler1 = (event) => {
        setVal1(event.target.value)
        if(!isEmptyObject(currencyNow)){
            let curr1_val = currencyNow[CURRENCY_DATA[curr1.CurrencyName]]
            let curr2_val = currencyNow[CURRENCY_DATA[curr2.CurrencyName]]
            let curr2_converted = (curr2_val/curr1_val)*(+event.target.value)
            setVal2(curr2_converted)
        }
    }
    const onChangeHandler2 = (event) => {
        setVal2(event.target.value)
        if(!isEmptyObject(currencyNow)){
            let curr1_val = currencyNow[CURRENCY_DATA[curr1.CurrencyName]]
            let curr2_val = currencyNow[CURRENCY_DATA[curr2.CurrencyName]]
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
        <div className="wrapper">
            <div className="converter">
                    <DropdownList
                        className="el1"
                        value={curr1}
                        data={CURRENCY}
                        dataKey='id'
                        textField='CurrencyName'
                        renderListItem = {({item}) => 
                        (<div>
                            <img src={`https://flagsapi.com/${item.FlagCode}/flat/32.png`}/>
                            <div>
                                {item.CurrencyName}
                            </div>
                        </div>)}
                        onChange={onCurr1Change}
                    />

                    <div className="el2"><img onClick={swap}  src={arrow_icon} alt=""  height="40px" width="40px"/></div>
                    

                    <DropdownList
                        className="el3"
                        value={curr2}
                        data={CURRENCY}
                        dataKey='id'
                        textField='CurrencyName'
                        renderListItem = {({item}) => 
                        (<div>
                            <img src={`https://flagsapi.com/${item.FlagCode}/flat/32.png`}/>
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