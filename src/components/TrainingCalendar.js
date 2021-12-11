import React, { useState } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ChosenTraining from './ChosenTraining';

const localizer = momentLocalizer(moment)

export default function TrainingCalendar({ trainings }) {
    const [showTraining, setShowTraining] = useState(false)
    const [targetData, setTargetData] = useState({title: "mocktitle", start: new Date(), end: new Date(), customer: {firstname: "mockfirstname", lastname: "mocklastname"}})

    const trainingEvents = trainings.map(t => {
        let startDate = new Date(t.date).toISOString()
        let newStartDate = new Date(startDate)
        let endDate = new Date(startDate)
        endDate.setMinutes(newStartDate.getMinutes() + t.duration);
        return { title: `${t.activity} (${t.customer.firstname} ${t.customer.lastname})`, start: newStartDate, end: endDate, allDay: false, customer: t.customer }
    })

    if (showTraining) {
        setTimeout(() => {
            setShowTraining(false)
        }, 2000)
    }

    return (
        <>
        <ChosenTraining showTraining={showTraining} setShowTraining={setShowTraining} data={targetData} />
        <div>
            <Calendar
                onSelectEvent={(v) => {
                    setShowTraining(true)
                    setTargetData(v)}}
                defaultView={"week"}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                events={trainingEvents}
            />
        </div>
        </>
    )
}
