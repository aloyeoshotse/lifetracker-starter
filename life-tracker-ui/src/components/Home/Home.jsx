import * as React from 'react';
import Container from '@mui/material/Container';
import Hero from './Hero/Hero'
import "./Home.css"

function Home() {
    return (
        <div className="home">
            <Hero />
            <div className="footer-titles">
                <div className="footer-title">
                    <img className="img-fit" src="http://codepath-lifetracker.surge.sh/static/media/icons-workout-48.4f4cdb05.svg" alt="Fitness"/>
                    <p>Fitness</p>
                </div>
                <div className="footer-title">
                    <img className="img-food" src="http://codepath-lifetracker.surge.sh/static/media/icons8-porridge-100.132d2715.svg" alt="Food"/>
                    <p>Food</p>
                </div>
                <div className="footer-title">
                    <img className="img-rest" src="http://codepath-lifetracker.surge.sh/static/media/icons8-resting-100.81067336.svg" alt="Rest"/>
                    <p>Rest</p>
                </div>
            </div>
        </div>
    )
}

export default Home;