import * as React from 'react'
import apiClient from '../../../services/apiClient';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import Login from '../../Login/Login';
import "./ExercisePage.css"

function ExercisePage({error, setError, invalidForm}) {

    const [exercise, setExercise] = useState()


    useEffect(() => {
        const fetchExerciseData = async () => {
            const { data, error } = await apiClient.listUserExerciseEntries()
    
            if (data?.exercises) { setExercise(data.exercises) }
    
            if (error) { setError((e) => ({...e, form: null})) }
        }
        fetchExerciseData()

    }, [])

    return(
        <div className="exercise">
            <Link to={'/exercise/create'}>
                <Button className='add-exercise'>Add Exercise</Button>  
            </Link>
            <ExerciseGrid exercise={exercise}/>
        </div>
         
    )
}

function ExerciseGrid({exercise}) {

    if (exercise) {exercise = Array.from(exercise).reverse();}

    return(
        <div className="exercise-grid">
        { exercise && exercise.length != 0 ?
            exercise.map((entry,idx) => { return <ExerciseCard key={idx} entry={entry}/> })
            :
            <div style={{fontWeight: "bold", textAlign: "center", marginTop: "2in"}}>No exercise entries available</div> 
        }
        </div>
    )
}

function ExerciseCard({entry}) {
    return(
        <div className="exercise-card">
            <h2>Exercise Card - {entry.id}</h2>
            <div></div>
            <div className="name">{entry.name}</div>
            <span className="duration get">Duration</span>
            <div className='intensity get'>Intensity</div>
            <span className="duration ans">{entry.duration}</span>
            <div className="intensity ans">{entry.intensity}</div>
            <div className="category">{entry.category}</div>
        </div>
    )
}

export default ExercisePage;