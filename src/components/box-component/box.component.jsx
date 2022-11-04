import Converter from "../converter-component/converter.component"
import './box.component.css';
const exchange = require('../../assets/exchange2.png')

const Box = () => {
    return(
        <div className="box-component">
            <h1>Currency Converter <span><img src={exchange} alt="" height="60px" width="60px" /></span></h1>
            <Converter/>
        </div>
    )
}

export default Box