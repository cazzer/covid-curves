import React, { useContext } from 'react'
import {
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area
} from 'recharts'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { FormattedData, StateData } from './typings'
import { MenuContext } from './menu-context'
import { COLORS } from './config'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(4)
    }
  })
)

function formatPopulation(number: number) {
  return `${(number / 1000000).toFixed(1)} million`
}

export default function ChartView(props: {
  data: FormattedData
}) {
  const classes = useStyles({})
  const { query, scale } = useContext(MenuContext)

  let renderedStates = props.data.states.sort((a, b) => (
    (a.percentageInfected || 0) > (b.percentageInfected || 0) ? -1 : 1
  ))

  if (query) {
    renderedStates = renderedStates.filter(state => (
      state.key.toLowerCase().match(query.toLowerCase())
      || state.name.toLowerCase().match(query.toLowerCase())
    ))
  } else {
    renderedStates = renderedStates.filter((state, index) => index < 12)
  }

  return (
    <Grid container className={classes.grid}>
      {renderedStates
        .filter((state, index) => (index < 10))
        .map((data: StateData) => (
        <Grid item key={data.key} xs={12} md={6}>
          <Typography variant="h3">{data.name}</Typography>
          {data.latest.positive && data.latest.total ? (
            <Typography variant="caption">
              Out of the {data.latest.total} people tested, {(data.latest.positive / data.latest.total * 100).toFixed(2)}% were positive. At this point, {data.percentageInfected.toFixed(2) }% of {data.name}'s population has contracted Covid-19, (based on a population of {formatPopulation(data.population)} according to the {data.populationCensusYear || 2020} census). {data.hospitalBeds && data.latest.hospitalized && `${(data.latest.hospitalized / data.hospitalBeds * 100).toFixed(2)}% of the estimated ${data.hospitalBeds} hospital beds are needed for Covid-19 patients.`}
            </Typography>
          ) : (
            <Typography variant="caption">
              No positive results yet.
            </Typography>
          )}
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart
              data={data.values}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {data.hospitalBeds && (
                <ReferenceLine y={data.hospitalBeds} stroke={COLORS.PENDING} label="Total est. hospital beds" />
              )}
              <XAxis dataKey="date" />
              <YAxis
                domain={[0, scale === 'even' ? props.data.maxTotal : 'dataMax']}
                orientation="left"
                type="number"
              />
              <Area
                dataKey="death"
                isAnimationActive={false}
                stackId="total"
                stroke={COLORS.DEATHS}
                fill={COLORS.DEATHS}
                type="monotone"
                name="Deaths"
              />
              <Area
                dataKey="hospitalized"
                isAnimationActive={false}
                stackId="total"
                stroke={COLORS.HOSPITALIZED}
                fill={COLORS.HOSPITALIZED}
                type="monotone"
                name="Hospitalized"
              />
              <Area
                dataKey="positive"
                isAnimationActive={false}
                stackId="total"
                stroke={COLORS.POSITIVE}
                fill={COLORS.POSITIVE}
                type="monotone"
                name="Positive Cases"
              />
              <Area
                dataKey="negative"
                isAnimationActive={false}
                stackId="total"
                stroke={COLORS.NEGATIVE}
                fill={COLORS.NEGATIVE}
                type="monotone"
                name="Negative Results"
              />
              <Tooltip />
              <Legend />
            </ComposedChart>
          </ResponsiveContainer>
        </Grid>
      ))}
    </Grid>
  )
}
