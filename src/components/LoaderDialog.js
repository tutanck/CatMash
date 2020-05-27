import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Backdrop } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function LoaderDialog({ open, onClose = () => {} }) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open} onClick={onClose}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}

LoaderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};
