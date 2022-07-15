import * as React from "react";
import Login from "../Login/Login";
import { Link } from "@mui/material";
import { Button } from "@mui/material";
import './Dashboard.css';

function Dashboard ({error, setError, invalidForm}) {

    return(
        <div className="dashboard">
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
       
    )

}

export default Dashboard;