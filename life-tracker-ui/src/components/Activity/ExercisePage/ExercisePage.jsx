import * as React from 'react'
import Login from '../../Login/Login';

function ExercisePage({error, setError, invalidForm}) {
    return(
        <div className="exercise">
           { !localStorage.getItem("life_tracker_token") ?

                <>
                    <p style={{color: "red", fontWeight: "bold", textAlign: "center"}}>Log in to access this page</p>
                    <Login error={error} setError={setError} invalidForm={invalidForm}/> 
                </>

            :
            
            <>Exercise Page</>

           }
        </div>
    )
}

function ExerciseGrid() {
    return(
        <div className="exercise-grid">
            Exercise Grid
        </div>
    )
}

function ExerciseCard() {
    return(
        <div className="exercise-card">
            Exercise Card
        </div>
    )
}

export default ExercisePage;