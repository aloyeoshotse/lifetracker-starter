import * as React from 'react'
import apiClient from '../../../services/apiClient';
import Login from '../../Login/Login';

function SleepPage({error, setError, invalidForm}) {
    return(
        <div className="sleep">
           { !localStorage.getItem("life_tracker_token") ?

                <>
                    <p style={{color: "red", fontWeight: "bold", textAlign: "center"}}>Log in to access this page</p>
                    <Login error={error} setError={setError} invalidForm={invalidForm}/> 
                </>

            :
            
            <>Sleep Page</>

           }
        </div>
    )
}

function SleepGrid() {
    return(
        <div className="sleep-grid">
            Sleep Grid
        </div>
    )
}

function SleepCard() {
    return(
        <div className="sleep-card">
            Sleep Card
        </div>
    )
}


export default SleepPage;