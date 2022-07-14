import * as React from 'react'
import Login from '../../Login/Login';

function NutritionPage({error, setError, invalidForm}) {
    return(
        <div className="nutrition">
           { !localStorage.getItem("life_tracker_token") ?

                <>
                    <p style={{color: "red", fontWeight: "bold", textAlign: "center"}}>Log in to access this page</p>
                    <Login error={error} setError={setError} invalidForm={invalidForm}/> 
                </>

            :
            
            <>Nutrition Page</>

           }
        </div>
    )
}

export default NutritionPage;