import React from 'react'
import { format } from 'date-fns'


export default function ChosenTraining({ showTraining, setShowTraining, data }) {




  

        const startTime = format(data.start, "dd/MM/yyyy hh:mm");
        const endTime = format(data.end, "dd/MM/yyyy hh:mm");

        return <div className={showTraining ? "training-card" : "training-card hidden"}>
            <span className="activity-header">{data.title.split(" ")[0]}</span>
            <span className="training-times">Start: {startTime}</span>
            <span className="training-times">End: {endTime}</span>
            <span className="customer-info">{data.customer.firstname} {data.customer.lastname}</span>
        </div>
    
}
