import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";
import './Dashboard.css';

function Dashboard ({error, setError, invalidForm}) {

    const [activityData, setActivityData] = useState();
    const [avgSleepTime, setAvgSleepTime] = useState();

    useEffect(() => {

        function calculateSleepTimeInHours(sleepobject) {

            let totalTimeInHours = 0;

            for (var prop in sleepobject) {
                let value = sleepobject[prop];
                let valueInt = parseInt(value);

                if (prop == "years") {totalTimeInHours += (8760*valueInt)}
                else if (prop == "months") {totalTimeInHours += (730*valueInt)}
                else if (prop == "days") {totalTimeInHours += (24*valueInt)}
                else if (prop == "hours") {totalTimeInHours += valueInt}
                else if (prop == "minutes") { totalTimeInHours += (valueInt/60)}
                else {totalTimeInHours += (valueInt/3600)}
            }
        
           setAvgSleepTime(totalTimeInHours.toFixed(2))
          }

        const getActivityData = async () => {
            const { data, error } = await apiClient.getUserFeedData()

            if(error) {setError(error?.data?.message)}
            if (data?.feed) {
                console.log("data-feed = ", data.feed)
                await setActivityData(data.feed)
            }

            await calculateSleepTimeInHours(data.feed.avgSleepDuration)

        }

        getActivityData()

    }, [])

    return(
        <>
            <div className="dashboard">
                 <div className="header">
                    <div className="title">
                        Overview
                    </div>
                    <div className="create-btns">
                        <Link to={'/exercise/create'}>
                            <Button>Add Exercise</Button>  
                        </Link>
                        <Link to={'/nutrition/create'}>
                            <Button>Record Nutrition</Button>
                        </Link>
                        <Link to={'/sleep/create'}>
                            <Button>Track Sleep</Button>
                        </Link>
                    </div>
                </div>
            </div>
        <div className="grid">
            <div className="SummaryStat large gold">
                <div className="background">
                    <p>Total Exercise Minutes</p>
                    { activityData ? 
                          <h1>{activityData.totalDuration}</h1> :
                          <h1>0</h1>
                    }
                </div>
            </div>
            <div className="SummaryStat large purple">
                <div className="background">
                    <p>Avg Sleep Hours</p>
                    {
                        activityData?.avgSleepDuration ? 
                            <h1>{avgSleepTime} hrs</h1> :
                            <h1>0</h1>
                    }
                </div>
            </div>
            <div className="SummaryStat large aqua">
                <div className="background">
                    <p>Avg Daily Calories</p>
                    { activityData ? 
                          <h1>{activityData.avgCalories.slice(0,4)}</h1> :
                          <h1>0</h1>
                    }
                </div>
            </div>
        </div>
        </>
       
    )

    // style={{position: "absolute", left:" -122px", bottom: "-122px", right: "0px", transform: "rotate(180deg)", transformOrigin: "center center"}}
}

export default Dashboard;