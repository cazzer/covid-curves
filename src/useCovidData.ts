import { useState, useEffect } from 'react'


export default function useCovidData() {
  const [state, setState] = useState({
    data: new Array(),
    maxConfirmed: 0,
    loading: true
  })

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv')
      .then(response => {
        return response.text()
      })
      .then((text: string) => {
        const rows = text.split('\n')
        const headers: Array<string> | undefined = rows.shift()?.split(',')
        if (!headers) {
          return
        }

        headers.shift()
        headers.shift()
        headers.shift()
        headers.shift()

        let maxConfirmed = 0

        const data: Array<any> = rows
          .filter(row => row.match(/,US,/))
          .map((row, index) => {
            const columns = row.split(',')
            const state = columns.shift()
            const country = columns.shift()
            const lng = columns.shift()
            const lat = columns.shift()
            return {
              key: index,
              state,
              country,
              lng,
              lat,
              data: columns.map((col, colIndex) => {
                const column = parseInt(col)
                maxConfirmed = maxConfirmed > column ? maxConfirmed : column
                return {
                  date: headers[colIndex],
                  confirmed: column,
                  'new cases': colIndex > 0
                    ? column - parseInt(columns[colIndex - 1])
                    : column
                }
              })
            }
          })

        setState({
          data,
          maxConfirmed,
          loading: false
        })
    })
  }, [])

  return state
}
