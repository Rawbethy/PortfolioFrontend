import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import './Utils/fonts/RobotoMono-VariableFont_wght.ttf';

import Navbar from './components/views/navbar';
import Body from './components/views/body';
import Earthquakes from './components/projects/Earthquake'
import Python from './components/projects/Python-Interpreter'
import ECommerce from './components/projects/E-Commerce'
import Footer from './components/views/footer';

type PAGE = {
  page: string,
  prevPosition: number,
  setPage: React.Dispatch<React.SetStateAction<string | null>>,
  setPrevPosition: React.Dispatch<React.SetStateAction<number | null>>
}

export const PAGEContext = React.createContext<PAGE>({
  page: null,
  prevPosition: 0,
  setPage: () => {},
  setPrevPosition: () => {}
});

export default function App() {
  const [page, setPage] = useState<string>('Home')
  const [prevPosition, setPrevPosition] = useState<number>(0)

  return (
    <PAGEContext.Provider value={{page, setPage, prevPosition, setPrevPosition}}>
      <div className="main" id='main'>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Body />}></Route>
            <Route path='/Earthquake-Detection' element={<Earthquakes/>}></Route>
            <Route path='/Python-Interpreter' element={<Python/>}></Route>
            <Route path='/E-Commerce' element={<ECommerce/>}></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </PAGEContext.Provider>
  )
}

