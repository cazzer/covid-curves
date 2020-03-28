export interface RawStateData {
  date: number | string
  state: string
  positive: number
  negative: number | null
  pending: number | null
  hospitalized: number | null
  death: number | null
  total: number | null
  dateChecked: string
  totalTestResults: number | null
  deathIncrease: number | null
  hospitalizedIncrease: number | null
  negativeIncrease: number | null
  positiveIncrease: number | null
  totalTestResultsIncrease: number | null
}

export interface StateData {
  key: string
  name: string
  population: number
  populationCensusYear: number
  percentageInfected: number
  hospitalBeds: number
  latest: RawStateData
  values: Array<RawStateData>
}

export interface FormattedData {
  maxTotal: number
  states: Array<StateData>
}
