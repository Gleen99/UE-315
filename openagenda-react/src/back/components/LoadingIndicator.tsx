import React from 'react';
import { Backdrop, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff', 
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  
  },
  skeleton: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    animation: `$rotate 2s linear infinite`,
    position: 'relative',
    margin: theme.spacing(2),
    '&::before': {
      content: '""',
      display: 'block',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
      animation: `$pulse 2s ease-in-out infinite`,
    }
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(0.95)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(0.95)' },
  },
}));

export const LoadingIndicator = () => {
  const classes = useStyles();
  return (
    <Backdrop open={true} className={classes.backdrop}>
      <Skeleton variant="circle" className={classes.skeleton} />
    </Backdrop>
  );
};
