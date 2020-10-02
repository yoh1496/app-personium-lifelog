import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PersoniumCellUrl } from 'personium-sdk-ts';
import { usePersoniumAuthentication } from '../lib/Personium/Context/PersoniumAuthentication';
import {
  CheckBoxInstalled,
  CheckExtCellRegistered,
  HandleInstallCompleted,
} from './CheckBoxInstalled';

export const NeedInstalledArea: React.FC<{
  cellUrl: PersoniumCellUrl;
  children: React.ReactNode;
}> = ({ children, cellUrl }) => {
  const [installed, setInstalled] = useState(false);
  const [completed, setCompleted] = useState(true);
  const { auth } = usePersoniumAuthentication();
  // const {
  //   loading: extCellLoading,
  //   foundCell,
  //   retrieveExtCell,
  // } = useRetrieveExtCell(cellUrl, auth.access_token);

  const handleComplete = useCallback(() => {
    setInstalled(true);
  }, []);

  // if (loading) return <div>checking install condition</div>;

  if (installed) return <>{children}</>;

  return (
    <CheckBoxInstalled>
      <CheckExtCellRegistered cellUrl={cellUrl}>
        <HandleInstallCompleted isNeeded={true} onComplete={handleComplete} />
      </CheckExtCellRegistered>
    </CheckBoxInstalled>
  );
};

NeedInstalledArea.propTypes = {
  children: PropTypes.node.isRequired,
  cellUrl: PropTypes.instanceOf(PersoniumCellUrl).isRequired,
};
