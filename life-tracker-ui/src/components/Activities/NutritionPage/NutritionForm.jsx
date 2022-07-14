import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/apiClient';

function NutritionForm({invalidForm}) {

    const [newNutrition, setNewNutrition] = useState({
                                                        name : "",
                                                        category : "",
                                                        quantity : 0,
                                                        calories : 0,
                                                        imageUrl : ""
                                                    })
    const navigate = useNavigate();

    let invalid = invalidForm(newNutrition);
        

    const handleCreateFieldChange = (change) => {

            let newObj = newNutrition;
            let property = change.target.name;
            let value = change.target.value;
            if (property == "quantity" || property == "calories") {
                value = parseInt(value)
            }
            let pair = {[property] : value}
            newObj = {...newObj, ...pair}
            setNewNutrition(newObj)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        navigate('/nutrition');

        await apiClient.createUserNutritionEntry({ 
        name: newNutrition.name,
        category: newNutrition.category,
        quantity: newNutrition.quantity,
        calories: newNutrition.calories,
        imageUrl: newNutrition.imageUrl
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
                    Record Nutrition
                </div>
            </Grid>
            <Grid item xs={12}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-required"
                label="Name"
                name="name"
                variant="outlined"
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
                id="outlined-required"
                label="Category"
                name="category"
                variant="outlined"
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
                required
                fullWidth
                id="outlined-number"
                label="Quantity"
                type="number"
                name="quantity"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    position: "relative",
                    top: "1.5in",
                    left: "5.35in",
                    width: '27.5ch',  }}
                variant="outlined"
                onChange={handleCreateFieldChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-number"
                label="Calories"
                name="calories"
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
                variant="outlined"
                onChange={handleCreateFieldChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                margin="normal"
                fullWidth
                label="Image URL"
                name="imageUrl"
                variant="outlined"
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

export default NutritionForm