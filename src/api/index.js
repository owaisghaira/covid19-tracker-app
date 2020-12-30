import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {

    let changealeurl = url;
    if (country) {
        changealeurl = `${url}/countries/${country}`
    }

    try {
        // const { data } = await axios.get(url);
        // const modifiedData = {
        //     confirmed: data.confirmed,
        //     recovered: data.recovered,
        //     deaths: data.deaths,
        //     lastUpdate: data.lastUpdate
        // }
        // return modifiedData;

        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changealeurl);
        return { confirmed, recovered, deaths, lastUpdate };

    } catch (err) {

    }
}
export const dailyFecthData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailydata) => ({
            confirmed: dailydata.confirmed.total,
            deaths: dailydata.deaths.total,
            date: dailydata.reportDate,
        }))
        return modifiedData
    } catch (err) {

    }
}

export const countries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name)

    } catch (err) {
        console.log(err)
    }
}