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
        console.log(exercise)
        fetchExerciseData()

        console.log("exercise:", exercise)
        console.log("token: ", localStorage.getItem("life_tracker_token"))

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
    return(
        <div className="exercise-grid">
        { exercise ?
            exercise.map((entry,idx) => { return <ExerciseCard key={idx} entry={entry}/> })
            :
            <div style={{fontWeight: "bold", textAlign: "center", marginTop: "3in"}}>No exercise entries available</div> 
        }
        </div>
    )
}

function ExerciseCard({entry}) {
    return(
        <div className="exercise-card">
            Exercise Card
            <div></div>
            <div className="name">{entry.name}</div>
            <div className="category">{entry.category}</div>
            <div className="duration">{entry.duration}</div>
            <div className="intensity">{entry.intensity}</div>
        </div>
    )
}

export default ExercisePage;