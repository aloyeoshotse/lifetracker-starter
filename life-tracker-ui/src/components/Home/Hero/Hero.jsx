import * as React from 'react'
import './Hero.css'

function Hero() {
    return(
        <div className="hero">
            <img id="img" src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg" alt="hero img" />
            <h1 id="title">Life Tracker</h1>
            <p id="description">Take Back Control of Your Life One Step at a Time</p>
        </div>
 )
}

export default Hero;