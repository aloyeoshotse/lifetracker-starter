import * as React from 'react';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/apiClient';

function SleepForm({invalidForm}) {

    const [newSleep, setNewSleep] = useState({
                                            startTime : "",
                                            endTime : ""
                                            })
    const navigate = useNavigate();

    let invalid = invalidForm(newSleep);
        

    const handleCreateFieldChange = (change) => {

            let newObj = newSleep;
            let property = change.target.name;
            let value = change.target.value;
            let pair = {[property] : value}
            newObj = {...newObj, ...pair}
            setNewSleep(newObj)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        navigate('/sleep');

        await apiClient.createUserSleepEntry({ 
        startTime: newSleep.startTime,
        endTime: newSleep.endTime,
        })
      };


    return (

        <form onSubmit={handleSubmit}>
            <div className="title"
                    style={{marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "0.5cm",
                    position: "relative",
                    top: "1.5in",
                    width: '55ch',
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "30px"}}>
                    Track Sleep
                </div>
            <div className="InputField" style={{position: "relative",
                                            top: "1.5in",
                                            left: "5.30in",
                                            width: '72ch'
                                            }}>
                <label name="startTime">Start Time</label>
                <div></div>
                <input type="datetime-local" name="startTime" onChange={handleCreateFieldChange} value={newSleep.startTime} style={{ width: '50ch',
                                                                                                                                    marginBottom: "1cm",
                                                                                                                                    height: "1cm",
                                                                                                                                    fontSize: "20px",
                                                                                                                                    backgroundColor: "#7e9a9a",
                                                                                                                                    fontFamily: "Arial"}}/>
            </div>
            
            <div className="InputField" style={{position: "relative",
                                            top: "1.5in",
                                            left: "5.30in",
                                            width: '72ch'
                                            }}>
                <label name="endTime">End Time</label>
                <div></div>
                <input type="datetime-local" name="endTime" onChange={handleCreateFieldChange} value={newSleep.endTime} style={{ width: '50ch',
                                                                                                                                marginBottom: "1cm",
                                                                                                                                height: "1cm",
                                                                                                                                backgroundColor: "#7e9a9a",
                                                                                                                                fontSize: "20px",
                                                                                                                                fontFamily: "Arial"}}/>
            </div>
            <Button 
                sx={{position: "relative",
                    top: "1.5in",
                    left: "5.35in",
                    width: '72ch', }}
                type="submit"
                // onClick={handleSubmit}
                disabled = {invalid}
            >
                Save
            </Button>
        </form>

    )
}

export default SleepForm