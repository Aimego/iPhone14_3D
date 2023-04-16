import React from 'react';
import Iphone from '../assets/images/iphone-14.jpg'
import HoldingIphone from '../assets/images/iphone-hand.png'

function Jumbotron () {
    const handleLearMore = () => {
        const element = document.querySelector('.sound-section')
        console.log(element?.getBoundingClientRect())
        window.scrollTo({
            top: element?.getBoundingClientRect().top,
            left: 0,
            behavior: 'smooth'
        })
    }
    return (
        <div className='jumbotron-section wrapper'>
            <h2 className='title'>New</h2>
            <img className='logo' src={Iphone}  alt='iPhone 14 Pro' />
            <p className='text'>Big and bigger.</p>
            <span className='description'>
                From $41.62/mo. for 24 mo. or $999 before trade-in. <br />
            </span>
            <ul className='links'>
                <li>
                    <button className='button'>Buy</button>
                </li>
                <li>
                    <a className='link' onClick={handleLearMore}>Learn more</a>
                </li>
            </ul>
            <img className='iphone-img' src={HoldingIphone} alt="iPhone" />
        </div>
    )
}

export default Jumbotron;