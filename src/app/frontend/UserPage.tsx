import React, { useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ProfileCard } from './ProfileCard';
import {
  usePersoniumAuthentication,
  usePersoniumConfig,
} from './lib/Personium';

import { NeedInstalledArea } from './CheckInstallation';
import { PersoniumCellUrl } from 'personium-sdk-ts';
import { useRetrieveExtCell, useExtCellRoleList } from './useExtCellList';
import { useBoxUrl } from './lib/Personium/Context/PersoniumBox';

const InstallView = () => {
  return <div>installation</div>;
};

export const UserPage: React.FC = () => {
  const { logout } = usePersoniumAuthentication();
  const { config } = usePersoniumConfig();

  if (!config.targetCellUrl) throw 'targetCellUrl is not set';

  const handleClick = useCallback(
    e => {
      e.preventDefault();
      logout();
    },
    [logout]
  );

  const cellUrl = useMemo(() => {
    if (!config.targetCellUrl) throw 'targetCellUrl is not set';
    return new PersoniumCellUrl(config.targetCellUrl);
  }, [config.targetCellUrl]);

  return (
    <>
      <NeedInstalledArea cellUrl={cellUrl}>
        <h2>User Page</h2>
        <ProfileCard cellUrl={cellUrl} />
        {/* <BoxView /> */}
        <div style={{ padding: 8 }}>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      </NeedInstalledArea>
    </>
  );
};
