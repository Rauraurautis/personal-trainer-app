import React, { useState, useEffect } from "react";
import { getCustomers, editCustomer } from "../services/customerService";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Snackbar } from "@mui/material";
import { getTrainings } from "../services/trainingService";

export default function CustomerEditFormDialog({ open, setOpen, setCustomers, editedCustomer, setTrainings }) {
    const [newCustomer, setNewCustomer] = useState({})
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        setNewCustomer({ firstname: editedCustomer.firstname, lastname: editedCustomer.lastname, email: editedCustomer.email, phone: editedCustomer.phone, streetaddress: editedCustomer.streetaddress,
            postcode: editedCustomer.postcode, city: editedCustomer.city })
    }, [editedCustomer])

    const handleClose = () => {
        setOpen(false);
    };

    const formatPhone = (phone) => {
        if (phone.match(/^\d{3}-\d{7}$/)) {
            return
        }
        let cleanedPhone = phone.replace(/\D*/, "");
        let phoneMatch = cleanedPhone.match(/^(\d{3})(\d{7})$/);
        if (!phoneMatch) {
            alert(`Incorrect phone number length for number ${cleanedPhone} (needs to be exactly 10 characters)`)
            return false
        } else {
            let formattedPhone = `${phoneMatch[1]}-${phoneMatch[2]}`
            setNewCustomer({ ...newCustomer, phone: formattedPhone })
        }
    }

    const editOldCustomer = async () => {
        if (newCustomer.firstname === "" || newCustomer.lastname === "") {
            alert("Provide both first name and last name")
            return;
        }
        await editCustomer(editedCustomer.links[0].href, newCustomer)
        let data = await getCustomers();
        setCustomers(data)
        data = await getTrainings()
        setTrainings(data)
        setSnackbarOpen(true)
        handleClose();
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="First name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCustomer.firstname}
                        onChange={(e) => setNewCustomer({ ...newCustomer, firstname: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCustomer.lastname}
                        onChange={(e) => setNewCustomer({ ...newCustomer, lastname: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                        onBlur={() => formatPhone(newCustomer.phone)}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Street address"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCustomer.streetaddress}
                        onChange={(e) => setNewCustomer({ ...newCustomer, streetaddress: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Postal code"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCustomer.postcode}
                        onChange={(e) => setNewCustomer({ ...newCustomer, postcode: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCustomer.city}
                        onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                    />
                </DialogContent>
                <DialogActions> 
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={editOldCustomer}>Edit customer</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="Customer has been edited!"
            />
        </div>
    );
}