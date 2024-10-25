import React from 'react'
import audoLogo from '../../assets/logo-audojo.png'
import '../../styles/homepage/Footer.css'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer-content'>
        <div><Link to="">Impressum</Link></div>
        <div><Link to="">Datenschutz</Link></div>
        <div className="footer-audojo-logo">
            <div>designed by</div>
            <img style={{height: "50px", borderRadius: "50%"}} src={audoLogo} alt="logo of audojo" />
        </div>

    </div>
  )
}

export default Footer