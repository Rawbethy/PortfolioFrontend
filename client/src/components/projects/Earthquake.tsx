import React, {useEffect, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {PAGEContext}from '../../App'
import axios from 'axios';
import Desc from '../../Utils/Descriptions'
import '../styles/earthquake.css';

const Earthquake = () => {

    const navigate = useNavigate();
    const {setPage} = useContext(PAGEContext)

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    })
    const [currLocation, setCurrLocation] = useState({
        latitude: null,
        longitude: null
    })
    const [imageName, setImageName] = useState(null);
    const [message, setMessage] = useState(null)

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        window.onpopstate = () => {
            navigate('/');
            setPage('Home');
        }
      }, [])

    useEffect(() => {
        setLocation(location);
        setCurrLocation(currLocation);
        setImageName(imageName);
        setMessage(message)
    }, [location, currLocation, imageName, message])

    const callAPI = async() => {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            try {
                const response = await axios.post('https://api.robert-duque.com:8080/warningAPI', { lat: latitude, lon: longitude });
                setMessage(response.data.message);
                setImageName(response.data.imageName);
            } catch (error) {
                console.log(error);
            }
        })
    }

    const manualAPI = async() => {
        const latitude = parseFloat(location.latitude);
        const longitude = parseFloat(location.longitude);
        try {
            const response = await axios.post('https://api.robert-duque.com:8080/warningAPI', { lat: latitude, lon: longitude });
            setMessage(response.data.message);
            setImageName(response.data.imageName);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="earthquake-main">
            <div className="container">
                <div className="title-eq">
                    <h1>Earthquake Warning System</h1>
                    <p><b>Scroll to bottom for demo</b></p>
                </div>
                <div className="desc-projects">
                    <p>{Desc.Earthquake.Intro}</p>
                    <p>{Desc.Earthquake.FirstPara}</p>
                    <p>{Desc.Earthquake.SecondPara}</p>
                    <p>{Desc.Earthquake.FinalPara}</p>
                </div>
                <div className="apiContainer">
                    <h1>Demo</h1>
                    <div className="options">
                        <h3>Use Current Location?</h3>
                        <div className='apiButton'>
                            <button type='submit' onClick={callAPI}>Press Me</button>
                        </div>
                        <h5>Or</h5>
                        <h3>Enter A Location:</h3>
                        <div className="location">
                            <div className="locLongitude">
                                <label htmlFor="">Longitude: </label>
                                <input type="text" name='longitude' onChange={e => setLocation((prevLocation) => ({...prevLocation, longitude: e.target.value}))}/>
                            </div>
                            <div className="locLatitude">
                                <label htmlFor="">Latitude: </label>
                                <input type="text" name='latitude'  onChange={e => setLocation((prevLocation) => ({...prevLocation, latitude: e.target.value}))}/>
                            </div>
                            <button type='submit' onClick={manualAPI}>Enter</button>
                        </div>
                    </div>
                </div>
                {imageName !== null && (
                    <div className="heatmap"> 
                        <img src={'https://api.robert-duque.com:8080/returnImage?imageName='+imageName} alt="" style={{'display': 'inline-block', 'maxHeight': '600px', 'maxWidth': '600px'}} />
                    </div>
                )}
                {message !== null && (<div className='warning-message'>
                    {message}
                </div>)}
            </div>
        </div>
    )
}

export default Earthquake

