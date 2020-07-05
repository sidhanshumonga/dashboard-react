import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  topPanel: {
      backgroundColor: '#1976d2'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Topbar() {
        const classes = useStyles();
        return (
            <div className={classes.root}>
            <AppBar position="static" className={classes.topPanel}>
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    INTERACTIVE DASHBOARD
                </Typography>
                </Toolbar>
            </AppBar>
            </div>
        )
}
