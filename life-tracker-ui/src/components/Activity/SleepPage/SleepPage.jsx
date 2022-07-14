import * as React from 'react'
import apiClient from '../../../services/apiClient';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
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
        console.log(sleep)
        fetchSleepData()
    }, [])



    return(
        <div className="sleep">
            <Button className='add-sleep'>Track Sleep</Button>
           { !localStorage.getItem("life_tracker_token") ?

                <>
                    <p style={{color: "red", fontWeight: "bold", textAlign: "center"}}>Log in to access this page</p>
                    <Login error={error} setError={setError} invalidForm={invalidForm}/> 
                </>

            :
            
            <></>

           }

            {sleep ? 

                <SleepGrid sleep={sleep}/>

                :

                <></>

            }

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