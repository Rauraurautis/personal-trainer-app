import React, { useState, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { IconButton, Button, TextField } from "@mui/material"
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CustomerFormDialog from "./CustomerFormDialog.js"
import CustomerEditFormDialog from './CustomerEditFormDialog';
import CustomerActivityFormDialog from './CustomerActivityFormDialog.js';
import DeleteWindow from './DeleteWindow';
import "../index.css"

export default function CustomerList({ customers, setCustomers, setTrainings }) {
    const [gridApi, setGridApi] = useState(null)

    const [open, setOpen] = useState(false);
    const [targetedCustomer, setTargetedCustomer] = useState({});
    const [editOpen, setEditOpen] = useState(false)
    const [deleteMenuOpen, setDeleteMenuOpen] = useState({state: false, object: {}})
    const [activityOpen, setActivityOpen] = useState(false)

    const columns = useMemo(() => {
        return [
            { headerName: "Firstname", field: "firstname" },
            { headerName: "Lastname", field: "lastname" },
            { headerName: "Street Address", field: "streetaddress" },
            { headerName: "Postal code", field: "postcode" },
            { headerName: "City", field: "city" },
            { headerName: "Email", field: "email" },
            { headerName: "Phone", field: "phone" },
            {
                headerName: "", resizable: true, sortable: false, filter: false,
                cellRendererFramework: (params) => {
                    return <IconButton size="small"
                        onClick={() => {
                            setDeleteMenuOpen({state: true, object: params.data})
                        }}><DeleteTwoToneIcon /></IconButton>

                },

            },
            {
                headerName: "", resizable: true, sortable: false, filter: false,
                cellRendererFramework: (params) => {
                    return <IconButton onClick={() => {
                        setTargetedCustomer(params.data);
                        setEditOpen(true)
                    }} size="small"><ModeEditOutlineIcon /></IconButton>
                }
            },
            {
                headerName: "", resizable: true, sortable: false, filter: false,
                cellRendererFramework: (params) => {
                    return <Button onClick={() => {
                        setTargetedCustomer(params.data)
                        setActivityOpen(true)
                    }}>Add training</Button>
                }
            }

        ]
    }, []);

    function onGridReady(params) {
        setGridApi(params.api);
    }

    const onFilterTextChange = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }


    return (

        <div style={{ zIndex: "1", position: "relative" }} className="ag-theme-alpine table">
            
            <DeleteWindow deleteOpen={deleteMenuOpen} setDeleteOpen={setDeleteMenuOpen} setCustomers={setCustomers} setTrainings={setTrainings} />
            <CustomerFormDialog open={open} setOpen={setOpen} setCustomers={setCustomers} />
            <CustomerEditFormDialog open={editOpen} setOpen={setEditOpen} setCustomers={setCustomers} editedCustomer={targetedCustomer} setTrainings={setTrainings} />
            <CustomerActivityFormDialog open={activityOpen} setOpen={setActivityOpen} setTrainings={setTrainings} customer={targetedCustomer} />
            <div className="newCustomer-button"><Button variant="contained" onClick={() => setOpen(true)}>Add a new customer</Button></div>
            <TextField style={{background: "white"}} size="small" margin="normal" type="search" onChange={onFilterTextChange} label="Search"/>
            <AgGridReact
                domLayout='autoHeight'
                onGridReady={onGridReady}
                defaultColDef={{
                    sortable: true,
                    resizable: true,
                    filter: true,
                    flex: 1,
                }}
                pagination={true}
                paginationPageSize={15}
                rowData={customers}
                columnDefs={columns}
            />


        </div>
    )
}
