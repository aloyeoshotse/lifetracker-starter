import * as React from 'react'
import apiClient from '../../../services/apiClient';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import './SleepPage.css'

function SleepPage({error, setError, invalidForm}) {

    const [sleep, setSleep] = useState()

    useEffect(() => {
        const fetchSleepData = async () => {
            const { data, error } = await apiClient.listUserSleepEntries()
    
            if (data?.sleep) { setSleep(data.sleep) }
    
            if (error) { setError((e) => ({...e, form: null})) }
        }
        fetchSleepData()
    }, [])



    return(
        <div className="sleep">
            <Link to={'/sleep/create'}>
                <Button className='add-sleep'>Track Sleep</Button>
            </Link>
            <SleepGrid sleep={sleep}/>
        </div>
    
    )
}

function SleepGrid({sleep}) {

    if (sleep) {sleep = Array.from(sleep).reverse();}

    return(
        <div className="sleep-grid">
             { sleep && sleep.length != 0 ?
                sleep.map((entry,idx) => { return <SleepCard key={idx} entry={entry}/> })
            :
            <div style={{fontWeight: "bold", textAlign: "center", marginTop: "2in"}}>No sleep entries available</div> 
        }
        </div>
    )
}

function SleepCard({ entry }) {

    const options = {  
        year: "numeric", month: "short",  
        day: "numeric"  
    };  

    return(
        <div className="sleep-card">
            <h2>Sleep Card</h2>
            <div></div>
            <div className='dates'>{new Date(entry.start_time).toLocaleDateString("en-us", options)} - {new Date(entry.end_time).toLocaleDateString("en-us", options)}</div>
            <div>
                <span className="start-time">Start Time </span>
                <span className="start-time">{new Date(entry.start_time).toLocaleTimeString()}</span>
            </div>
            <span>
                <span className="end-time">End Time</span>
                <span className="end-time">{new Date(entry.end_time).toLocaleTimeString()}</span>
            </span>
        </div>
    )
}


export default SleepPage;