const Date = ({date}) => {
    const dateNow = date.substring(0, 10)
    const time = date.substring(11, 19)
    console.log(dateNow, time)
    if(dateNow && time){
        return(
            <p>Last Updated: {time}, {dateNow} UTC</p>
        )
    }
    else{
        return(
            <h5></h5>
        )
    }
    
}

export default Date;