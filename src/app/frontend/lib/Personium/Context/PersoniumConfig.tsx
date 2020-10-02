import React, { createContext, useContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const defaultConfig = {};

type PersoniumConfigType = {
  appCellUrl?: string;
  targetCellUrl?: string;
};

type PersoniumConfigContextType = [
  PersoniumConfigType,
  React.Dispatch<React.SetStateAction<PersoniumConfigType>>?
];

const PersoniumConfigContext = createContext<PersoniumConfigContextType>([
  defaultConfig,
]);

export function usePersoniumConfig(): {
  config: PersoniumConfigType;
  setConfig: {
    setAppCellUrl: (appCellUrl: string) => void;
    setTargetCellUrl: (targetCellUrl: string) => void;
    rawSetConfig: React.Dispatch<React.SetStateAction<PersoniumConfigType>>;
  };
} {
  const [config, setConfig] = useContext(PersoniumConfigContext);

  if (setConfig === undefined) throw 'illegal usage of usePersoniumConfig';

  return {
    config: {
      appCellUrl: config.appCellUrl,
      targetCellUrl: config.targetCellUrl,
    },
    setConfig: {
      setAppCellUrl: useCallback(
        appCellUrl => setConfig(c => Object.assign({}, c, { appCellUrl })),
        [setConfig]
      ),
      setTargetCellUrl: useCallback(
        targetCellUrl =>
          setConfig(c => Object.assign({}, c, { targetCellUrl })),
        [setConfig]
      ),
      rawSetConfig: setConfig,
    },
  };
}

type PersoniumConfigProviderProps = {
  // config: undefined | PersoniumConfigType;
  // setConfig: (config => PersoniumConfigType) => void;
};

export const PersoniumConfigProvider: React.FC<PersoniumConfigProviderProps> = ({
  children,
}) => {
  const [config, setConfig] = useState<PersoniumConfigType>(defaultConfig);
  return (
    <PersoniumConfigContext.Provider value={[config, setConfig]}>
      {children}
    </PersoniumConfigContext.Provider>
  );
};

PersoniumConfigProvider.propTypes = {
  // config: PropTypes.objectOf(
  //   PropTypes.shape({
  //     appCellUrl: PropTypes.string,
  //     targetCellUrl: PropTypes.string,
  //   })
  // ),
  // setConfig: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
