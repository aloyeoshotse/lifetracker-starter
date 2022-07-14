import * as React from "react";
import Login from "../Login/Login";
import './Activity.css';

function Activity ({error, setError, invalidForm}) {

    return(
        <div className="activity">
           { !localStorage.getItem("life_tracker_token") ?

                <>
                    <p style={{color: "red", fontWeight: "bold", textAlign: "center"}}>Log in to access this page</p>
                    <Login error={error} setError={setError} invalidForm={invalidForm}/> 
                </>

            :
            
            <>Activity</>

           }
        </div>
    )

}

export default Activity;