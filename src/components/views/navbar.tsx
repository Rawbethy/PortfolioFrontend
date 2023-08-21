import React, {useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {PAGEContext} from '../../App'
import '../styles/general-styles.css'

export default function NavBar() {

    const {page, setPage} = useContext(PAGEContext);
    const navigate = useNavigate();

    const handleClickScroll = (id: string) => {
        const element = document.getElementById(id);
        if(element) {
            element.scrollIntoView({block: 'start', behavior: 'smooth'});
        }
    }
    
    const hideNav = () => {
        let theEnd = 0;
        var navbar = document.getElementById('navbar') as HTMLElement;
    
        if(navbar !== null) {
            window.addEventListener('scroll', function() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if(scrollTop > theEnd) {
                    navbar.style.top = '-50px';
                }
                else {
                    navbar.style.top = '0';
                }
                theEnd = scrollTop;
            })
        }
    }

    useEffect(() => {
        hideNav();
    }, [])

    useEffect(() => {
        setPage(page);
        if(page === 'Home') {
            navigate('/')
        }
    }, [page])

    if(page === 'Home') {
        return (
            <div className="nav">
                <nav id="navbar">
                    <ul>
                        <li><button className='nav-button' onClick={() => handleClickScroll('home')}>Home</button></li>
                        <li><button className='nav-button' onClick={() => handleClickScroll('about')}>About</button></li>
                        <li><button className='nav-button' onClick={() => handleClickScroll('projects')}>Projects</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
    else {
        return (
            <div className="nav">
                <nav id='navbar'>
                    <ul>
                        <li><button className='nav-button' onClick={() => {setPage('Home')}}>Return</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
}