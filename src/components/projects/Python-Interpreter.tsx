import React, {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import {PAGEContext}from '../../App'
import '../styles/python.css'

const PythonInterpreter = () => {

  const navigate = useNavigate();
  const {prevPosition, setPage} = useContext(PAGEContext)

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    window.onpopstate = () => {
      navigate('/');
      setPage('Home')
    }
  }, [])

  return (
    <div>
        <div className="python-main">
            <h2>This page is currently under construction<br></br>Come again another time</h2>
        </div>
    </div>
  )
}

export default PythonInterpreter
