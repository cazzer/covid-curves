import React, { useContext } from 'react'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ToggleButton from '@material-ui/lab/ToggleButton'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SettingsOverscan from '@material-ui/icons/SettingsOverscan'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory, useLocation } from 'react-router-dom'

import { MenuContext } from './menu-context'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      flexGrow: 1,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
)

function Search() {
  const classes = useStyles({})
  const location = useLocation()
  const history = useHistory()
  const queryString = location.search.match(/q=(.*)/)


  const handleChange = (event: any) => {
    history.replace({
      pathname: location.pathname,
      search: event.target.value
        ? `?q=${event.target.value}`
        : ''
    })
  }

  return (
    <InputBase
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      inputProps={{ 'aria-label': 'search' }}
      onChange={handleChange}
      fullWidth
      value={queryString ? queryString[1] : ''}
    />
  )
}

function Scale() {
  const classes = useStyles({})
  const { scale, toggleScale } = useContext(MenuContext)

  const handleChange = () => {
    toggleScale()
  }

  const tooltip = scale === 'even'
    ? 'Scale graphs to best fit'
    : 'Scale graphs consistently'

  return (
    <Tooltip title={tooltip}>
      <ToggleButton
        className={classes.menuButton}
        aria-label={tooltip}
        onChange={handleChange}
        selected={scale === 'fit'}
        value={scale}
      >
        <SettingsOverscan />
      </ToggleButton>
    </Tooltip>
  )
}

export default function Menu() {
  const classes = useStyles({})
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          COVID-19 Curves
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Search />
        </div>
        <Scale />
        <Link href="https://github.com/cazzer/covid-curves">
          <IconButton
            className={classes.menuButton}
          >
            Github
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
