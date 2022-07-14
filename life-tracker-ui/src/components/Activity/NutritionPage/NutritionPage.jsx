import * as React from 'react'
import apiClient from '../../../services/apiClient';
import { useEffect, useState } from 'react';
//import NutritionGrid from './NutritionGrid';
import Login from '../../Login/Login';
import "./NutritionPage.css"

function NutritionPage({error, setError, invalidForm}) {

    const [nutrition, setNutrition] = useState()


    useEffect(() => {
        const fetchNutritionData = async () => {
            const { data, error } = await apiClient.listUserNutritionEntries()
    
            if (data?.nutrition) { setNutrition(data.nutrition) }
    
            if (error) { setError((e) => ({...e, form: null})) }
        }
        console.log(nutrition)
        fetchNutritionData()
    }, [])


    return(
        <div className="nutrition">
           { !localStorage.getItem("life_tracker_token") ?

                <>
                    <p style={{color: "red", fontWeight: "bold", textAlign: "center"}}>Log in to access this page</p>
                    <Login error={error} setError={setError} invalidForm={invalidForm}/> 
                </>

            :

                <></>
            }   

            {nutrition ? 

                <NutritionGrid nutrition={nutrition}/>

                :

                <></>

            }

        </div>
    )
}


function NutritionGrid({nutrition}) {
    return(
        <div className="nutrition-grid">
        { nutrition ?
            nutrition.map((entry,idx) => { return <NutritionCard key={idx} entry={entry}/> })
            :
            <div style={{fontWeight: "bold", textAlign: "center", marginTop: "3in"}}>No nutrition entries available</div> 
        }
        </div>
    )
}


function NutritionCard({ entry }) {
    return(
        <div className="nutrition-card">
            Nutrition Card
            <div></div>
            <img id="img" src={entry.imageUrl} alt="temp-img" />
            <div className="name">{entry.name}</div>
            <div className="category">{entry.category}</div>
            <div className="quantity">{entry.quantity}</div>
            <div className="calories">{entry.calories}</div>
        </div>
    )
}

export default NutritionPage;