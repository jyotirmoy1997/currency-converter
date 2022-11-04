import Converter from "../converter-component/converter.component"
import './box.component.css';
const headerIcon = require('../../assets/exchange2.png')

const Box = () => {
    return(
        <div className="box-component">
            <h1>Currency Converter <span><img src={headerIcon} alt="" height="60px" width="60px" /></span></h1>
            <Converter/>
        </div>
    )
}

export default Box