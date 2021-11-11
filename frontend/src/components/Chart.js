import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Chart = ({ data }) => {
    return (
        <LineChart width={750} height={450} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="high" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="high" stroke="#8884d8" />
            {/* <Line type="monotone" dataKey="adjsHigh" stroke="#82ca9d" /> */}
        </LineChart>
    )
}

export default Chart
