
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from 'prop-types';

const PublicRoute = ({children}) => {
    const {user}=useAuth();
    if(user){
        return <Navigate to='/' replace={true}/>
    }
    return children
}

export default PublicRoute

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };