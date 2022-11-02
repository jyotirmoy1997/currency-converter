import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Box from './components/box-component/box.component';

const App = () => {
  const APICall = (result) => {
    
  }
  
  const [res, updateRes] = useState(undefined)
  

  // let myHeaders = new Headers();
  // myHeaders.append("apikey", "cvXkeuXBw3P3eP3dLxjBxuWM8PU90ndg");

  // let requestOptions = {
  //   method: 'GET',
  //   redirect: 'follow',
  //   headers: myHeaders
  // };

  // fetch("https://api.apilayer.com/fixer/convert?to=INR&from=USD&amount=1", requestOptions)
  //   .then(response => response.text())
  //   .then((result) => {
  //     updateRes(result)
      
  //   })
  //   .catch(error => console.log());

  //   console.log(res)
  // let flag = true
  //   if(flag){
  //     
  //     flag = false;
  //   }

  const change = () => {
    const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'b880d2fb55mshb3ea1421ad36653p18ecafjsn9090079798ff',
              'X-RapidAPI-Host': 'currencyscoop.p.rapidapi.com'
            }
          };
          
          fetch('https://currencyscoop.p.rapidapi.com/latest', options)
            .then(response => response.json())
            .then((response) => {
              updateRes(response)
            })
            .catch(err => console.error(err));
        
          console.log(res)
  }
  

  
  
  return (
    <div className="App">
        <Box/>
    </div>
  );
}

export default App;
