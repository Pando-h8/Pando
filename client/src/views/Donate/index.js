import React from 'react'
import './donate.css'
import Navbar from '../../components/Navbar'



function DonatePage() {

  const redirectDonate = () => {
    window.open('https://onetreeplanted.org/products/indonesia');
  };

  return (
    <div className="bgkdonate">
      <Navbar />
      <div className="block">
        <h1 className="donatebutton" onClick={redirectDonate}>Donate Here</h1>
      </div>
    </div>
  )
}

export default DonatePage
