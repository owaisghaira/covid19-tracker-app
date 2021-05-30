import React, { useState, useEffect } from 'react'
import { dailyFecthData } from '../../api'
import { Line, Bar, Pie } from 'react-chartjs-2'
import styles from './charts.module.css'

function Charts({ data, country }) {
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchapi = async () => {
            setDailyData(await dailyFecthData());
        }
        fetchapi()
        // console.log(dailyData)
    }, [])

  

    const PieChart = (
        data.confirmed
            ? (
                <Pie data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            data: [data.confirmed.value, data.recovered.value, data.deaths.value],
                            backgroundColor: [
                                'rgba(0,0,255,0.5)',
                                'rgba(0,255,0,0.5)',
                                'rgba(255,0,0,0.5)',

                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',

                            ],
                            borderWidth: 1,
                        },
                    ],
                }} />
            ) : null

    );

    const linechart = (
        dailyData.length
            ?
            (<Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true
                    }],
                }}
            />)
            : null
    )

    // const barChart = (
    //     data.confirmed
    //         ? (
    //             <Bar
    //                 data={{
    //                     labels: ['Infected', 'Recovered', 'Deaths'],
    //                     datasets: [{
    //                         label: 'People',
    //                         backgroundColor: [
    //                             'rgba(0,0,255,0.5)',
    //                             'rgba(0,255,0,0.5)',
    //                             'rgba(255,0,0,0.5)',
    //                         ],
    //                         data: [data.confirmed.value, data.recovered.value, data.deaths.value]
    //                     }]
    //                 }}
    //                 options={{
    //                     legend: { display: false },
    //                     title: { display: true, text: `Current state in ${country}` },
    //                 }}
    //             />
    //         )
    //         : null
    // )
    return (

        <div className={styles.container}>
            {country ? PieChart : linechart}

        </div>
    );
}

export default Charts;
