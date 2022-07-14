import * as React from 'react'
import apiClient from '../../../services/apiClient';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import Login from '../../Login/Login';
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
    return(
        <div className="sleep-grid">
             { sleep ?
                sleep.map((entry,idx) => { return <SleepCard key={idx} entry={entry}/> })
            :
            <div style={{fontWeight: "bold", textAlign: "center", marginTop: "3in"}}>No sleep entries available</div> 
        }
        </div>
    )
}

function SleepCard({ entry }) {

    return(
        <div className="sleep-card">
            Sleep Card
            <div></div>
            <div className="start-time">{entry.start_time}</div>
            <div className="end-time">{entry.end_time}</div>
        </div>
    )
}


export default SleepPage;