import React, { createContext, useContext, useState, useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

type PersoniumAuthState = null | {
  access_token: string;
};
type PersoniumAuthenticationContextType = [
  PersoniumAuthState,
  React.Dispatch<React.SetStateAction<PersoniumAuthState>>?
];

const PersoniumAuthenticationContext = createContext<
  PersoniumAuthenticationContextType
>([null]);

export function usePersoniumAuthentication(): {
  auth: PersoniumAuthState;
  authWithROPC: (
    cellUrl: string,
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
} {
  const [auth, setAuth] = useContext(PersoniumAuthenticationContext);

  if (setAuth === undefined)
    throw 'Illegal usage of usePersoniumAuthentication';

  const authWithROPC = useCallback(
    async (cellUrl, username, password) => {
      const data = new URLSearchParams();
      data.set('grant_type', 'password');
      data.set('username', username);
      data.set('password', password);
      // data.set('p_target', cellUrl);
      const res = await fetch(`${cellUrl}__token`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      if (!res.ok) {
        throw {
          status: res.status,
          statusText: res.statusText,
        };
      }
      setAuth(await res.json());
    },
    [setAuth]
  );

  const logout = async () => {
    setAuth(null);
  };
  return { auth, authWithROPC, logout };
}

export const PersoniumAuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<PersoniumAuthState>(null);
  return (
    <PersoniumAuthenticationContext.Provider value={[auth, setAuth]}>
      {children}
    </PersoniumAuthenticationContext.Provider>
  );
};

PersoniumAuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

type PrivateRouteProps = {
  authPath: string;
  children: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  authPath,
  children,
  ...rest
}) => {
  const { auth } = usePersoniumAuthentication();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth !== null ? (
          children
        ) : (
          <Redirect to={{ pathname: authPath, state: { from: location } }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  authPath: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
