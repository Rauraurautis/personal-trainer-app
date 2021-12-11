import axios from "axios";
const BASE_URL = "https://customerrest.herokuapp.com/api/trainings"
const getTrainings = () => {
    return axios.get("https://customerrest.herokuapp.com/gettrainings").then(res => res.data)
}

const addTraining = (training) => {
    return axios.post("https://customerrest.herokuapp.com/api/trainings", training)
}

const editTraining = (trainingUrl, training) => {
    return axios.put(trainingUrl, training);
}

const deleteTraining = (trainingId) => {
    return axios.delete(`${BASE_URL}/${trainingId}`);
}

export {
    getTrainings,
    addTraining,
    editTraining,
    deleteTraining
}