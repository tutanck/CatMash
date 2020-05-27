import React from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CatList from './pages/CatList';
import CatMatch from './pages/CatMatch';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import './App.css';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: blue[600],
  },
  title: {
    flexGrow: 1,
    marginLeft: '64px',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className='App'>
      <CssBaseline />

      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Cat Mash
          </Typography>

          <Button href='/' color='inherit'>
            Match
          </Button>

          <span>/</span>

          <Button href='/gallery' color='inherit'>
            Gallery
          </Button>
        </Toolbar>
      </AppBar>

      <Router>
        <Switch>
          <Route path='/gallery'>
            <CatList />
          </Route>

          <Route path='/'>
            <CatMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
