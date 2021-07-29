import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  AppBar, Container, IconButton, makeStyles, Toolbar, Typography,
} from '@material-ui/core';
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';

import { ContainerPreview } from './ContainerPreview/ContainerPreview';

const useStyles = makeStyles({
  container: {
    paddingTop: '35px',
  },
});

export const VideoChatApplication:React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <VideocamSharpIcon />
          </IconButton>
          <Typography variant="h6">
            Video Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Switch>
          <Route path="/join" component={ContainerPreview} />
        </Switch>
      </Container>
    </div>

  );
};
