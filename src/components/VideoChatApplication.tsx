import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { ContainerPreview } from './ContainerPreview/ContainerPreview';

export const VideoChatApplication:React.FC = () => {
  return (
    <Container>
      <Switch>
        <Route path="/join" component={ContainerPreview} />
      </Switch>
    </Container>

  );
};
