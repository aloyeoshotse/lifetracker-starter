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

function NutritionGrid() {
    return(
        <div className="nutrition-grid">
            Nutrition Grid
        </div>
    )
}

function NutritionCard() {
    return(
        <div className="nutrition-card">
            Nutrition Card
        </div>
    )
}

export default NutritionPage;