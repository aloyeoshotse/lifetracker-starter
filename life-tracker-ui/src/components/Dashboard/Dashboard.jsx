import * as React from "react";
import { Link } from "react-router-dom";
import { Button, containerClasses } from "@mui/material";
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";
import './Dashboard.css';

function Dashboard ({error, setError}) {

    const [nutritionData, setNutritionData] = useState();
    const [exerciseData, setExerciseData] = useState();
    const [sleepData, setSleepData] = useState();
    const [user, setUser] = useState()

    useEffect(() => {


        const getUserActivityData = async () => {
            const { data, error } = await apiClient.getUserData()
            if(error) {setError(error?.data?.message)}
            if (data?.feed) {
                setNutritionData(data.feed.nutritionData)
                setExerciseData(data.feed.exerciseData)
                setSleepData(data?.feed?.sleepData?.avgSleepTime)    
            }
        }

        const getUser = async () => {
            const { data, error } = await apiClient.fetchUserFromToken()
            if(error) {setError(error?.data?.message)}
            if (data){setUser(data.user)}
        }

        getUserActivityData()
        getUser()

    }, [])

    return(
        <>
            <div className="dashboard">
            { user?.firstName ?

                 <div className="Banner" style={{backgroundColor: "#647B7B",
                                                    height: "100px",
                                                    marginTop: "1.5cm",
                                                    display: "flex",
                                                    justifyContent: "center"}}>
                    <h1 style={{fontSize: "50px", width: "fit-content", marginTop: "20px"}}>
                        Welcome, {user.firstName}
                    </h1>
                </div>

                :
                <></>
            }
                 <div className="header">
                    <div className="title">
                        Overview
                    </div>
                    <ul className="create-btns">
                        <li>
                            <a href="/exercise/create">Add Exercise</a>  
                        </li>
                        <li>
                            <a href='/nutrition/create'>Record Nutrition</a>
                        </li>
                        <li>
                            <a href='/sleep/create'>Track Sleep</a>
                        </li>
                    </ul>
                </div>
            </div>
        <div className="grid">
            <div className="SummaryStat large gold">
                <div className="background">
                    <p>Total Exercise Minutes</p>
                    { exerciseData?.totalDuration ? 
                          <h1>{exerciseData.totalDuration}</h1> :
                          <h1>0.00</h1>
                    }
                </div>
            </div>
            <div className="SummaryStat large purple">
                <div className="background">
                    <p>Avg Sleep Hours</p>
                    { sleepData ? 
                            <h1>{sleepData}</h1> :
                            <h1>0</h1>
                    }
                </div>
            </div>
            <div className="SummaryStat large aqua">
                <div className="background">
                    <p>Avg Daily Calories</p>
                    { nutritionData?.avgCalories ? 
                          <h1>{nutritionData.avgCalories.slice(0,4)}</h1> :
                          <h1>0.00</h1>
                    }
                </div>
            </div>
        </div>
        </>
       
    )
}

export default Dashboard;