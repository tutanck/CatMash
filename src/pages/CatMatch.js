import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import clsx from 'clsx';
import Axios from 'axios';
import LoaderDialog from '../components/LoaderDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bloc: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    cursor: 'pointer',
  },
  leftBloc: {
    backgroundColor: lightBlue[100],
  },
  rightBloc: {
    backgroundColor: 'white',
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

export default function CatMatch() {
  const classes = useStyles();

  const [actionInProgress, setActionInProgress] = useState(false);
  const [cats, setCats] = useState([{}, {}]);

  const leftCat = cats[0],
    rightCat = cats[1];

  async function fetchCats() {
    setActionInProgress(true);

    try {
      const data = await Axios.get('http://localhost:3000/cats/match');

      if (data && data.data.length > 0) {
        setCats(data.data);
      }
    } catch (err) {
      alert('Veuillez réésayer plus tard');
    } finally {
      setActionInProgress(false);
    }
  }

  async function voteForCat(catId) {
    setActionInProgress(true);

    try {
      await Axios.post(`http://localhost:3000/votes/add/by/cat/${catId}`, { vote: 1 });
    } catch (err) {
      alert('Veuillez réessayer plus tard');
    } finally {
      setActionInProgress(false);
      fetchCats();
    }
  }

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container alignItems='stretch'>
        <Grid item xs={6} onClick={() => voteForCat(leftCat._id)}>
          <div className={clsx(classes.bloc, classes.leftBloc)}>
            <Avatar alt={leftCat.url} src={leftCat.url} className={classes.avatar} />
          </div>
        </Grid>
        <Grid item xs={6} onClick={() => voteForCat(rightCat._id)}>
          <div className={clsx(classes.bloc, classes.rightBloc)}>
            <Avatar alt={rightCat.url} src={rightCat.url} className={classes.avatar} />
          </div>
        </Grid>
      </Grid>

      <LoaderDialog open={actionInProgress} />
    </div>
  );
}

CatMatch.propTypes = {
  leftCat: PropTypes.exact({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  rightCat: PropTypes.exact({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};
