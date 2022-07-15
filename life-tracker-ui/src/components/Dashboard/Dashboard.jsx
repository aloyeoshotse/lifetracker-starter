import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import './Dashboard.css';

function Dashboard ({error, setError, invalidForm}) {

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
                    <h1>change me!</h1>
                </div>
            </div>
            <div className="SummaryStat large purple">
                <div className="background">
                    <p>Avg Sleep Hours</p>
                    <h1>change me!</h1>
                </div>
            </div>
            <div className="SummaryStat large aqua">
                <div className="background">
                    <p>Avg Daily Calories</p>
                    <h1>change me!</h1>
                </div>
            </div>
        </div>
        </>
       
    )

    // style={{position: "absolute", left:" -122px", bottom: "-122px", right: "0px", transform: "rotate(180deg)", transformOrigin: "center center"}}
}

export default Dashboard;