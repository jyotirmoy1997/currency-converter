import './date.component.css';

const Date = ({date}) => {
    const dateNow = date.substring(0, 10)
    const time = date.substring(11, 19)
    if(dateNow && time){
        return(
            <p>Last Updated: {time}, {dateNow} UTC</p>
        )
    }
    else{
        return(
            <p></p>
        )
    }
    
}

export default Date;