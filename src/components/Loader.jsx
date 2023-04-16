import React from 'react'
import AnimateLogo from '../assets/images/logo-animated.gif'

function Loader() {
    return ( 
        <div className='loader'>
            <img className='logo' src={AnimateLogo} alt='apple loader' />
        </div>
     );
}

export default Loader;