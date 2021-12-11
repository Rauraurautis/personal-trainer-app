import React, { useState, useEffect } from "react";
import { addTraining, getTrainings } from "../services/trainingService";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { Snackbar } from "@mui/material";

export default function CustomerEditFormDialog({ open, setOpen, setTrainings, customer }) {
    const [training, setTraining] = useState({ date: new Date().toISOString(), activity: "", duration: "", customer: "" })
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const addNewTraining = () => {
        if (!training.duration.match(/^\d+$/)) {
            alert("Only include numbers in the duration!")
            return;
        }
        console.log(training)
        addTraining(training).then(res => getTrainings().then(data => setTrainings(data)))
        setSnackbarOpen(true);
        handleClose()
    }

    useEffect(() => {
        try {
            setTraining({...training, customer: customer.links[0].href})
        } catch (error) {
            return
        }
    }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                    <div style={{marginTop: "20px"}}>
                    <DateTimePicker 
                        renderInput={(props) => <TextField {...props} />}
                        label="Date and time"
                        value={training.date}
                        onChange={(newValue) => {
                            setTraining({...training, date: newValue.toISOString()});
                        }}
                    />
                    </div>
                    </LocalizationProvider>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Activity"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={training.activity}
                        onChange={(e) => setTraining({ ...training, activity: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Duration"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={training.duration}
                        onChange={(e) => setTraining({ ...training, duration: e.target.value })}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addNewTraining}>Add training</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="New activity has been added!"
            />
        </div>
    );
}