import * as React from 'react'
import apiClient from '../../../services/apiClient';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
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
        fetchNutritionData()
    }, [])


    return(
        <div className="nutrition">
             <Link to={'/nutrition/create'}>
                <Button className='add-nutrition'>Record Nutrition</Button>
             </Link>
             <NutritionGrid nutrition={nutrition}/>
        </div>

       
    )
}


function NutritionGrid({nutrition}) {

    if (nutrition) {nutrition = Array.from(nutrition).reverse();}

    return(
        <div className="nutrition-grid">
        { nutrition && nutrition.length != 0 ?
            nutrition.map((entry,idx) => { return <NutritionCard key={idx} entry={entry}/> })
            :
            <div style={{fontWeight: "bold", textAlign: "center", marginTop: "2in"}}>No nutrition entries available</div> 
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