import * as React from 'react';
import Container from '@mui/material/Container';
import Hero from './Hero/Hero'
import "./Home.css"

function Home() {
    return (
        <div className="home">
            <Hero />
            <div className="tiles">
                <div className="tile">
                    {/* <img src="/static/media/icons-workout-48.4f4cdb05.svg" alt="Fitness"/> */}
                    <p>Fitness</p>
                </div>
                <div className="tile">
                    {/* <img src="/static/media/icons8-porridge-100.132d2715.svg" alt="Food"/> */}
                    <p>Food</p>
                </div>
                <div className="tile">
                    {/* <img src="/static/media/icons8-resting-100.81067336.svg" alt="Rest"/> */}
                    <p>Rest</p>
                </div>
                <div className="tile">
                    {/* <img src="/static/media/icons8-planner-100.997ca54c.svg" alt="Planner"/> */}
                    <p>Planner</p>
                </div>
            </div>
        </div>
    )
}

export default Home;