
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const {user}=useAuth();
    if(!user){
        return <Navigate to='/signup' replace={true}/>
    }
    return children
}

export default PrivateRoute

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };