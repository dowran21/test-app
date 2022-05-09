// import {getIsLoading, getIsLogged} from '../application/selectors/auth'
import { Route, Navigate, useLocation } from 'react-router-dom';
import {useSelector} from 'react-redux';
// import Loading from './Loading';

const PrivateRoute = ({ component: Component, redirect, ...rest }) => {
  const location = useLocation();
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const isLogged = useSelector(state => state?.auth?.isLogged);
  return (<Route {...rest}
    render={props => {
      if (isLoading) {
        return <p>Loading</p>;
      } else if (isLoading === true && isLogged === false){
        return <p>Loading</p>;
      }else if (isLoading === false && isLogged === false ) {
        return <Navigate to={{ pathname: redirect, state: { from: location } }} />;
      } else if(isLogged === false){
        return <Navigate to={{ pathname: redirect, state: { from: location } }} />;
      }else {
        return <Component {...props} />;
      }
    }}
  />
);}

export default PrivateRoute;
