import Converter from "../converter-component/converter.component"
import './box.component.css';

const Box = () => {
    return(
        <div className="box-component">
            <h1>This is the Box Component</h1>
            <Converter/>
        </div>
    )
}

export default Box