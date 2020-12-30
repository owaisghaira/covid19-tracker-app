import React, { useState, useEffect } from 'react'
import { dailyFecthData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import { StylesProvider } from '@material-ui/core'
import styles from './charts.module.css'

function Charts() {
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchapi = async () => {
            setDailyData(await dailyFecthData());
        }
        fetchapi()
        // console.log(dailyData)
    },[])

    const linechart = (
        dailyData.length
            ?
            (<Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        labels: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        labels: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true
                    }],
                }}
            />)
            : null
    )
    return (

        <div className={styles.container}>
            {linechart}
        </div>
    );
}

export default Charts;
