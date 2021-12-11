import React, { useMemo } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Label, Bar, Tooltip } from 'recharts';

export default function Statistics({ trainings }) {


    // Gets each activity and sums their respective amount of minutes
    const totalMinutes = useMemo(() => {
        let activities = []
        for (let i = 0; i < trainings.length; i++) {
            if (activities.filter(a => a.activity === trainings[i].activity).length === 0) {
                activities.push({ id: trainings[i].id, activity: trainings[i].activity, duration: 0 })
            }
            for (let j = 0; j < activities.length; j++) {
                if (trainings[i].activity === activities[j].activity) {
                    activities[j] = { ...activities[j], duration: activities[j].duration += trainings[i].duration }
                }
            }
        }
        return activities;
    }, [trainings]);


    return (
        <div className="chart-container">
            <BarChart className="chart-container" width={1000} height={500} data={totalMinutes} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis dataKey="duration">
                    <Label value="Minutes per activity" position="insideLeft" offset={0} angle={-90} />
                </YAxis>
                <Tooltip />
                <Bar dataKey="duration" fill="rgb(65, 140, 253)" />
            </BarChart>
        </div>
    )
}
