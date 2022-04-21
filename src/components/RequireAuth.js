/* eslint-disable no-unused-vars */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useStates from '../states'

const RequireAuth = ({ allowedRoles }) => {
    const [state, actions] = useStates();
    const location = useLocation();

    return (
        state.access_level_id
            ? <Outlet />
            : state.access_level_id !== 1
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;