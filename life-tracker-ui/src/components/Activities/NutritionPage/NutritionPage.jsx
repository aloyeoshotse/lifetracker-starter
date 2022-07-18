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

    console.log("entry = ", entry)

    return(
        <div className="nutrition-card">
             { entry?.image_url ?
                <img id="img-nutrition" src={entry.image_url} alt="temp-img" />
                :
                <img id="img-nutrition" src="https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-comin.jpg?ver=6" alt="" />
            }
            <h2>Nutrition Card - {entry.id}</h2>
            <div></div>
            <div className="name">{entry.name}</div>
            <div className="quantity get">Quantity</div>
            <div className="calories get">Calories</div>
            <div className="quantity ans">{entry.quantity}</div>
            <div className="calories ans">{entry.calories}</div>
            <div className="category">{entry.category}</div>
        </div>
    )
}

export default NutritionPage;