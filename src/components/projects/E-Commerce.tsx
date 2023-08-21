import React, {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {PAGEContext}from '../../App'
import '../styles/e-commerce.css';

const ECommerce = () => {

    const navigate = useNavigate();
    const {setPage} = useContext(PAGEContext)
  
    useEffect(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      window.onpopstate = () => {
        navigate('/');
        setPage('Home')
      }
    }, [])

    return (
    <div>
        <div className="python-main" style={{'textAlign': 'center'}}>
            <h2 style={{'padding': '40px', 'margin': 'auto'}}>This page is currently under construction<br></br>Come again another time</h2>
        </div>
    </div>
    )
}

export default ECommerce
