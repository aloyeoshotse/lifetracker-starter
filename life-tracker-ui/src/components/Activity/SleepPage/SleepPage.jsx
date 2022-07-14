import * as React from 'react'
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

export default SleepPage;