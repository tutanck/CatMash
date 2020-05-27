import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoaderDialog from '../components/LoaderDialog.js';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100vw',
    height: '100vh',
  },
}));

export default function CatList() {
  const classes = useStyles();

  const [isLoadingCats, setIsLoadingCats] = useState(false);
  const [cats, setCats] = useState([]);

  async function fetchAllCats() {
    setIsLoadingCats(true);

    try {
      const data = await axios.get('http://localhost:3000/cats/list');

      if (data && data.data.length > 0) {
        setCats(data.data);
      }
    } catch (err) {
      alert('Impossible de charger la galerie');
    } finally {
      setIsLoadingCats(false);
    }
  }

  useEffect(() => {
    fetchAllCats();
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {cats.map((cat) => (
          <GridListTile key={cat.id} style={{ height: '300px' }}>
            <img src={cat.url} alt={cat.id} />
            <GridListTileBar title={<span>Score:</span>} subtitle={cat.score} />
          </GridListTile>
        ))}
      </GridList>

      <LoaderDialog open={isLoadingCats} />
    </div>
  );
}
