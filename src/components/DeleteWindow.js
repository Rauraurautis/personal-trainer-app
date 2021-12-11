import React from 'react'
import { deleteCustomer, getCustomers } from '../services/customerService'
import { deleteTraining, getTrainings } from '../services/trainingService';

export default function DeleteWindow({ deleteOpen, setDeleteOpen, setCustomers, setTrainings }) {

    const deletionData = deleteOpen.object;

    if (!deleteOpen.state) {
        setTimeout(() => {
            return ""
        }, 500)
    }

// Deletion of training, in case of firstname-attribute being undefined (when a customer is being deleted)
    if (deletionData.firstname === undefined) {
        const remove = () => {
            deleteTraining(deletionData.id).then(res => getTrainings().then(res => setTrainings(res)))
            setDeleteOpen({ ...deleteOpen, state: false })
        }

        return <div className={deleteOpen.state ? "delete-window delete-active" : "delete-window delete-inactive"}>
            <p>{`Are you sure you wish to remove ${deletionData.activity}?`}</p>
            <div className="button-container">
                <button onClick={() => remove()}>Yes</button>
                <button onClick={() => setDeleteOpen({ ...deleteOpen, state: false })}>No</button>
            </div>
        </div>
    }

// Deletion of customer if the if-block was not executed (when a training is being deleted)

    const remove = async () => {
        await deleteCustomer(deletionData.links[0].href)
        let customerData = await getCustomers();
        setCustomers(customerData)
        let trainingData = await getTrainings();
        setTrainings(trainingData)
        setDeleteOpen({ ...deleteOpen, state: false })
    }

    return <div className={deleteOpen.state ? "delete-window delete-active" : "delete-window delete-inactive"}>
        <p>{`Are you sure you wish to remove ${deletionData.firstname} ${deletionData.lastname}?`}</p>
        <div className="button-container">
            <button onClick={() => remove()}>Yes</button>
            <button onClick={() => setDeleteOpen({ ...deleteOpen, state: false })}>No</button>
        </div>
    </div>








}
