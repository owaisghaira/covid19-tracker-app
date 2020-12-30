import React, { useEffect, useState } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import styles from './CountryPicker.module.css'
import { countries } from '../../api'

function CountryPicker({ handleCountryChange }) {

  const [fecthcountries, setfecthcountries] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      setfecthcountries(await countries())
    }
    fetchApi()
  }, [])

  // console.log(fecthcountries)

  return (
    <FormControl className={styles.formcontrol}>
      <NativeSelect defaultValue='' onChange={(e)=>handleCountryChange(e.target.value)}>
        <option value=''>Global</option>
        {fecthcountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
}

export default CountryPicker;