import React, {Component} from 'react';
import '../styles/general-styles.css'

export default class Footer extends Component {
    render() {
        return (
            <div className='footerMain'>
                <div className="footerSocials">
                    <div className='icon-footer'>
                        <a href="https://github.com/Rawbethy" target="_blank" className='fab fa-github' rel="noopener noreferrer"> </a>
                    </div>
                    <div className="icon-footer">
                        <a href="https://www.linkedin.com/in/robert-duque/" target="_blank" className='fab fa-linkedin' rel="noopener noreferrer"> </a>
                    </div>
                    <div className="icon-footer">
                        <a href="https://www.facebook.com/robby.anthony.37" target="_blank" className='fab fa-facebook' rel="noopener noreferrer"> </a>
                    </div>
                    <div className="icon-footer">
                        <a href="https://www.instagram.com/robsmidphotos/?hl=en" target="_blank" className='fab fa-instagram' rel="noopener noreferrer"> </a>
                    </div>
                </div>
            </div>
        )
    }
}