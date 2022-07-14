import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/apiClient';

function ExerciseForm({invalidForm}) {

    const [newExercise, setNewExercise] = useState({
                                                    name: "",
                                                    category: "",
                                                    duration: 0,
                                                    intensity: 0
                                                    })
    const navigate = useNavigate();

    let invalid = invalidForm(newExercise);
        

    const handleCreateFieldChange = (change) => {

            let newObj = newExercise;
            let property = change.target.name;
            let value = change.target.value;
            if (property == "duration" || property == "intensity") {
                value = parseInt(value)
            }
            let pair = {[property] : value}
            newObj = {...newObj, ...pair}
            setNewExercise(newObj)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        navigate('/exercise');

        const { data, error } = await apiClient.createUserExerciseEntry({ 
        name: newExercise.name,
        category: newExercise.category,
        duration: newExercise.duration,
        intensity: newExercise.intensity
        })
      };

    return (
        <Box
        component="form"
        sx={{'& .MuiTextField-root': { mt: 1, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        >

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className="title"
                    style={{marginLeft: "auto",
                    marginRight: "auto",
                    position: "relative",
                    top: "1.5in",
                    width: '55ch',
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "30px"}}>
                    Add Exercise
                </div>
            </Grid>
            <Grid item xs={12}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="filled-required"
                label="Name"
                name="name"
                variant="filled"
                sx={{marginLeft: "auto",
                    marginRight: "auto",
                    position: "relative",
                    top: "1.5in",
                    width: '55ch',
                    }}
                onChange={handleCreateFieldChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="filled-required"
                label="Category"
                name="category"
                variant="filled"
                sx={{marginLeft: "auto",
                    marginRight: "auto",
                    position: "relative",
                    top: "1.5in",
                    width: '55ch'
                    }}
                onChange={handleCreateFieldChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                margin="normal"
                fullWidth
                id="filled-number"
                label="Duration(min)"
                type="number"
                name="duration"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    position: "relative",
                    top: "1.5in",
                    left: "5.35in",
                    width: '27.5ch',  }}
                variant="filled"
                onChange={handleCreateFieldChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                margin="normal"
                fullWidth
                id="filled-number"
                label="Intensity(1-10)"
                name="intensity"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    position: "relative",
                    top: "1.5in",
                    right: "0.05in",
                    width: '27.5ch'
                }}
                variant="filled"
                onChange={handleCreateFieldChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button 
                    sx={{position: "relative",
                        top: "1.5in",
                        left: "5.35in",
                        width: '72ch', }}
                    type="submit"
                    disabled = {invalid}
                >
                    Save
                </Button>
            </Grid>
        </Grid>
        </Box>
    )
}

export default ExerciseForm