import React, { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { IconButton, TextField } from "@mui/material"
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteWindow from "./DeleteWindow"
import { format } from "date-fns"

import "../index.css"


export default function TrainingList({ trainings, setTrainings, setCustomers }) {
    const [gridApi, setGridApi] = useState(null)

    const [deleteMenuOpen, setDeleteMenuOpen] = useState({state: false, object: {}})

    const columns = useMemo(() => {
        return [
            {
                headerName: "Date", field: "date", resizable: true, width: 50,
                cellRendererFramework: (params => {
                    let newDate = new Date(params.data.date);
                    return `Date: ${format(newDate, "dd/MM/yy")} Time: ${format(newDate, "HH:mm")}`
                })
            },
            { headerName: "Duration", field: "duration", width: 20 },
            { headerName: "Activity", field: "activity" },
            {
                headerName: "Customer", field: "customer.firstname", sortable: true,
                cellRendererFramework: (params) => {
                    try {
                        return `${params.data.customer.firstname} ${params.data.customer.lastname}`
                    } catch (error) {
                        return `Invalid name`;
                    }
                }
            },
            {
                headerName: '', resizable: true, width: 50, sortable: false, filter: false,
                cellRendererFramework: (params) => {
                    return <IconButton size="small"
                        onClick={() => setDeleteMenuOpen({state: true, object: params.data})}><DeleteTwoToneIcon /></IconButton>

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
        <div style={{ zIndex: "1", position: "relative" }} className="ag-theme-alpine table training-table">
            <TextField style={{background: "white"}} size="small" margin="normal" type="search" onChange={onFilterTextChange} label="Search"/>
            <DeleteWindow deleteOpen={deleteMenuOpen} setDeleteOpen={setDeleteMenuOpen} setTrainings={setTrainings} />
            <AgGridReact
                domLayout='autoHeight'
                onGridReady={onGridReady}
                defaultColDef={{
                    sortable: true,
                    searchable: true,
                    filter: true,
                    flex: 1
                }}
                
                pagination={true}
                paginationPageSize={15}
                rowData={trainings}
                columnDefs={columns}
            />


        </div>
    )
}
