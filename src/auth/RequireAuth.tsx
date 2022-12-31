import { useNavigate, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export function RequireAuth({ children, redirectTo, hasAnyAuthorities = [] }) {
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
  const sessionHasBeenFetched = useAppSelector(
    (state) => state.authentication.sessionHasBeenFetched
  );
  const account = useAppSelector((state) => state.authentication.account);
  const isAuthorized = hasAnyAuthority(account.authorities, hasAnyAuthorities);

  const checkAuthorities = () => {
    if(isAuthorized) {
      console.log(children)
      return children;
     } else return (
      <div className="insufficient-authority">
        <div className="alert alert-danger">
          You are not authorized to access this page.
        </div>
      </div>
    );
  };

  const renderRedirect = () => {
    console.log('f');
    if (!sessionHasBeenFetched) {
      return <div></div>;
    } else {
      return isAuthenticated ? children : <Navigate to={redirectTo} replace/>;
    }
  };

  return renderRedirect();
}

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some((auth) => authorities.includes(auth));
  }
  return false;
};
