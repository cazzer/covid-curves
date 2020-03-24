build-daily-data-file:
	echo 'export default ' > ./src/data/covid-daily-data.ts
	curl https://covidtracking.com/api/states/daily >> ./src/data/covid-daily-data.ts
