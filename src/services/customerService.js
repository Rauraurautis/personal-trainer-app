import axios from "axios";
const BASE_URL = "https://customerrest.herokuapp.com/api/customers"


const getCustomers = () => {
    return axios.get(BASE_URL).then(res => res.data).then(data => data.content)
}

const addCustomer = (customer) => {
    return axios.post(BASE_URL, customer)
}

const editCustomer = (customerUrl, customer) => {
    return axios.put(customerUrl, customer);
}

const deleteCustomer = (customerUrl) => {
    return axios.delete(customerUrl);
}

export {
    getCustomers,
    addCustomer,
    editCustomer,
    deleteCustomer
}