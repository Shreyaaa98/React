import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react'
import InfoBox from './InfoBox.jsx';


export default function SearchBox(){
    let [city,setCity]=useState("");
    let [results,setResults]=useState({});

    let api_url='http://api.openweathermap.org/geo/1.0/direct';
    let api_key='15fa83f99d9acf7100538fd2a92f7b2d';
let getWeather=async()=>{
let response=await fetch(`${api_url}?q=${city}&appid=${api_key}`);
let [jsonResponse]=await response.json();

let result={
    latitude:jsonResponse.lat,
    long:jsonResponse.lon
}
return result;
}
    let handleChange=(evt)=>{
         setCity(evt.target.value);
    }
     let handleSubmit=async (event)=>{
        event.preventDefault();
       
        setCity(' ');
        let res=await getWeather();
        setResults(res);
     }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <h3>Search for the weather</h3>
            <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleChange} required/>
            <br /> <br />
            <Button variant="contained" type='submit'>Search</Button>
            </form>
            <InfoBox results={results}/>
            
            
            
        </div>
    )
}