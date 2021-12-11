import React, {useState, useEffect} from 'react';
import {getCustomers} from "./services/customerService.js"
import {getTrainings} from "./services/trainingService.js"
import CustomerList from './components/CustomerList.js';
import TrainingList from "./components/TrainingList.js"
import Statistics from './components/Statistics.js';
import {AppBar, Toolbar, Typography} from "@mui/material"
import Menu from './components/Menu.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import TrainingCalendar from './components/TrainingCalendar.js';

function App() {
  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getCustomers().then(res => setCustomers(res));
    getTrainings().then(res => setTrainings(res))
  }, [])


  return (
    <div>
      <Router>
      <div style={{zIndex: 5}} >
      <AppBar position="relative" style={{background: "#2225dd"}}>
        <Toolbar>
        <Menu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Trainer Application
          </Typography>
        </Toolbar>
      </AppBar>
      </div>
      
      <Routes>
      <Route path="/customers" element={<CustomerList customers={customers} setCustomers={setCustomers} setTrainings={setTrainings} />} />
      <Route path="/trainings" element={<TrainingList trainings={trainings} setTrainings={setTrainings} setCustomers={setCustomers} />} />
      <Route path="/calendar" element={<TrainingCalendar trainings={trainings} />} />
      <Route path="/statistics" element={<Statistics trainings={trainings} />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
