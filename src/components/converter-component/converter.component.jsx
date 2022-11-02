import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./converter.component.css"
import CURRENCY_DATA from '../../currency-data.json'
const arrow_icon = require('../../assets/exchange.png')

const Converter = () => {
    let colors = ['Orange', 'Red', 'Blue', 'Purple'];
    console.log(Object.keys(CURRENCY_DATA))
    return(
        <div className="converter">

            <DropdownList
                className="el1"
                defaultValue="United States Dollar"
                data={Object.keys(CURRENCY_DATA)}
            />

            <img className="el2" src={arrow_icon} alt="" srcset="" height="20px" width="20px"/>

            <DropdownList
            className="el3"
            defaultValue="Euro"
            data={Object.keys(CURRENCY_DATA)}/>

            <input className="el4" type="number" name="" id="val1"/>

            <input className="el5" type="number" name="" id="val2"/>
        </div>
    )
}
export default Converter;