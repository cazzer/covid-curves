import React, { useContext } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area
} from 'recharts'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { FormattedData } from './app'
import { MenuContext } from './menu-context'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(4)
    }
  })
)

export default function ChartView(props: {
  data: FormattedData
}) {
  const classes = useStyles({})
  const { query, scale } = useContext(MenuContext)

  let renderedStates = props.data.states.sort((a, b) => (
    (a.latest.total || 0) > (b.latest.total || 0) ? -1 : 1
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
        .map(data => (
        <Grid item key={data.key} xs={12} md={6}>
          <Typography variant="h3">{data.name}</Typography>
          {data.latest.positive && data.latest.total ? (
            <Typography variant="caption">
              Out of the {data.latest.total} people tested, {(data.latest.positive / data.latest.total * 100).toFixed(2)}% were positive.
            </Typography>
          ) : (
            <Typography variant="caption">
              No positive results yet.
            </Typography>
          )}
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={data.values}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
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
                stroke="#D62246"
                fill="#D62246"
                type="monotone"
              />
              <Area
                dataKey="positive"
                isAnimationActive={false}
                stackId="total"
                stroke="#4B1D3F"
                fill="#4B1D3F"
                type="monotone"
              />
              <Area
                dataKey="negative"
                isAnimationActive={false}
                stackId="total"
                stroke="#17BEBB"
                fill="#17BEBB"
                type="monotone"
              />
              <Tooltip />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </Grid>
      ))}
    </Grid>
  )
}
