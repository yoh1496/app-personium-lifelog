import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBoxUrl } from '../lib/Personium/Context/PersoniumBox';
import { PersoniumCellUrl, ExtCellData } from 'personium-sdk-ts';
import { usePersoniumAuthentication } from '../lib/Personium/Context/PersoniumAuthentication';
import { useRetrieveExtCell, useExtCellRoleList } from '../useExtCellList';

export const CheckBoxInstalled: React.FC = ({ children }) => {
  const { loading, error, boxUrl } = useBoxUrl();

  if (loading)
    return (
      <>
        <h3>CheckBoxInstalled</h3>
        <div>loading</div>
      </>
    );

  if (boxUrl === null) return <div>Box not installed</div>;

  return <>{children}</>;
};

CheckBoxInstalled.propTypes = {
  children: PropTypes.node.isRequired,
};

export const CheckExtCellRegistered: React.FC<{
  children: React.ReactNode;
  cellUrl: PersoniumCellUrl;
}> = ({ children, cellUrl }) => {
  const { auth } = usePersoniumAuthentication();

  if (auth === null) throw 'not authorized';
  const { loading, foundCell } = useRetrieveExtCell(cellUrl, auth.access_token);

  if (loading)
    return (
      <>
        <h3>CheckExtCellRegistered</h3>
        <div>loading</div>
      </>
    );

  if (foundCell === null) return <div>ExtCell is not registered</div>;

  return <CheckRoleAssigned extCell={foundCell}>{children}</CheckRoleAssigned>;
};

CheckExtCellRegistered.propTypes = {
  children: PropTypes.node.isRequired,
  cellUrl: PropTypes.instanceOf(PersoniumCellUrl).isRequired,
};

export const CheckRoleAssigned: React.FC<{
  children: React.ReactNode;
  extCell: ExtCellData;
}> = ({ children, extCell }) => {
  const { auth } = usePersoniumAuthentication();

  if (auth === null) throw 'not authorized';
  const { loading, roleList } = useExtCellRoleList(extCell, auth.access_token);

  if (loading)
    return (
      <>
        <h3>CheckRoleAssigned</h3>
        <div>loading</div>
      </>
    );

  if (roleList.length === 0) return <div>Role is not assigned</div>;

  return <>{children}</>;
};

CheckRoleAssigned.propTypes = {
  children: PropTypes.node.isRequired,
  extCell: PropTypes.any.isRequired,
};

export const HandleInstallCompleted: React.FC<{
  isNeeded: boolean;
  onComplete: () => void;
}> = ({ isNeeded, onComplete }) => {
  useEffect(() => {
    if (isNeeded) onComplete();
  }, [isNeeded, onComplete]);

  return (
    <>
      <h3>HandleInstallCompleted</h3>
      <button onClick={onComplete}>OK</button>
    </>
  );
};

HandleInstallCompleted.propTypes = {
  isNeeded: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
};
