import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute:React.FC = ({ component: Component, ...rest }:any) => {
  // const { currentUser } = useSelector((state:RootStateOrAny) => state.userInfo);
  return (
    <Route
      {...rest}
      render={(props: JSX.IntrinsicAttributes) => {
        return true ? (
        // return currentUser && Object.keys(currentUser).length ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};
