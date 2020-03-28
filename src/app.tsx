import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import ChartView from './chart-view'
import covidData from './data/covid-daily-data'
import Menu from './menu'
import { Provider } from './menu-context'
import stateMap from './state-map'

import { RawStateData, FormattedData } from './typings'


function formatData(data: Array<RawStateData>): FormattedData {
  const states: any = {}
  let maxTotal = 0

  data.reverse()

  data.forEach((datum: RawStateData) => {
    if (!states[datum.state]) {
      states[datum.state] = {
        key: datum.state,
        // @ts-ignore
        ...stateMap[datum.state],
        latest: datum,
        values: [],
        // @ts-ignore
        percentageInfected: datum.positive / stateMap[datum.state].population * 100
      }
    }

    let total = datum.total || 0

    const date = datum.date.toString()

    states[datum.state].values.push({
      ...datum,
      date: `${date[4]}${date[5]}/${date[6]}${date[7]}`
    })

    if ((datum.total || 0) > states[datum.state].latest.total) {
      states[datum.state].latest = datum
      // @ts-ignore
      states[datum.state].percentageInfected = datum.positive / stateMap[datum.state].population * 100
    }

    maxTotal = total > maxTotal ? total : maxTotal
  })

  return {
    maxTotal,
    states: Object.values(states)
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.primary.main,
      bottom: 0,
      position: 'fixed'
    },
    footerText: {
      color: 'lightgray',
      textAlign: 'center',
      flexGrow: 1
    }
  })
)

function Footer() {
  const classes = useStyles({})
  return (
    <Grid container className={classes.footer}>
      <Typography className={classes.footerText}>
        Source data from <a className={classes.footerText} href="https://covidtracking.com/" target="_blank">The COVID Tracking Project</a>, <a className={classes.footerText} href="https://www.kff.org/">KFF</a>
      </Typography>
    </Grid>
  )
}

function App() {
  const formattedData = formatData(covidData)
  return (
    <Provider>
      <Menu />
      <ChartView data={formattedData} />
      <Footer />
    </Provider>
  )
}

export default App
