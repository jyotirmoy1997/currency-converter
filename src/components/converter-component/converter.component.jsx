import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./converter.component.css"
import CURRENCY_DATA from '../../currency-data.json'
import { useState, useEffect } from "react";
import Date from "../Date/date.component";
const arrow_icon = require('../../assets/exchange.png')

const Converter = () => {

    function isEmptyObject(obj){
        return JSON.stringify(obj) === '{}'
    }

    const [val1, setVal1] = useState()
    const [val2, setVal2] = useState()
    const [curr1, setCurr1] = useState("United States Dollar")
    const [curr2, setCurr2] = useState("Indian Rupee")
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

    // console.log(date)

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
            let curr1_val = currencyNow.response.rates[CURRENCY_DATA[curr1]]
            let curr2_val = currencyNow.response.rates[CURRENCY_DATA[curr2]]
            let curr2_converted = (curr2_val/curr1_val)*(+event.target.value)
            setVal2(curr2_converted)
        }
    }
    const onChangeHandler2 = (event) => {
        setVal2(event.target.value)
        console.log(event.target.value)
        if(!isEmptyObject(currencyNow)){
            let curr1_val = currencyNow.response.rates[CURRENCY_DATA[curr1]]
            let curr2_val = currencyNow.response.rates[CURRENCY_DATA[curr2]]
            let curr1_converted = (curr1_val/curr2_val)*(+event.target.value)
            setVal1(curr1_converted)
        }
    }
    return(
        <div className="converter">

            <DropdownList
                className="el1"
                defaultValue={curr1}
                value={curr1}
                data={CURRENCY_DATA}
                // renderListItem = {({item}) => (<span>{item}</span>)}
                onChange={onCurr1Change}
            />

            <img className="el2" src={arrow_icon} alt="" srcset="" height="20px" width="20px"/>

            <DropdownList
            className="el3"
            defaultValue={curr2}
            value={curr2}
            data={Object.keys(CURRENCY_DATA)}
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

            <Date className="el6" date={date}/>
        </div>
    )
}
export default Converter;