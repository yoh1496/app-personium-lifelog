import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  getExternalCellList,
  PersoniumCellUrl,
  ODataQueryParameters,
  ExtCellData,
  RoleData,
  getExternalCellRoleList,
} from 'personium-sdk-ts';

export const useExtCellList = (
  cellUrl: PersoniumCellUrl,
  access_token: string,
  query: ODataQueryParameters
): {
  loading: boolean;
  cellList: Array<unknown>;
  refreshExtCellList: () => void;
} => {
  const [loading, setLoading] = useState(false);
  const [cellList, setCellList] = useState<Array<ExtCellData>>([]);
  const refMounted = useRef(true);

  const refreshExtCellList = useCallback(async () => {
    const result = await getExternalCellList(cellUrl, access_token, query);
    console.log(refMounted.current);
    if (refMounted.current === false) {
      return;
    }
    setCellList(result.d.results);
    setLoading(false);
    console.log('refreshExtCellList done', result.d.results);
  }, [cellUrl, access_token, query]);

  useEffect(() => {
    setLoading(true);
    refreshExtCellList();
    return function cleanup() {
      console.log('cleanup');
      refMounted.current = false;
    };
  }, [refreshExtCellList]);

  return { loading, cellList, refreshExtCellList };
};

export function useExtCellRoleList(
  extCell: ExtCellData,
  access_token: string
): {
  loading: boolean;
  roleList: Array<RoleData>;
  refreshExtCellRoleList: () => Promise<void>;
} {
  const [loading, setLoading] = useState(true);
  const [roleList, setRoleList] = useState<Array<RoleData>>([]);

  const refMount = useRef(true);
  const refreshExtCellRoleList = useCallback(async () => {
    const result = await getExternalCellRoleList(extCell, access_token, {
      $filter: [
        // "_Box.Name eq 'app-ishiguro-01'",
        "Name eq 'LineEventWriter'",
      ].join(' and '),
    });
    console.log(refMount.current, result);
    if (refMount.current === false) return;

    setRoleList(result.d.results);
    setLoading(false);
    console.log('useExtCellRoleList#refreshExtCellRoleList is done');
  }, [extCell, access_token]);

  useEffect(() => {
    setLoading(true);
    refMount.current = true;
    refreshExtCellRoleList();
    return function cleanup() {
      console.log('useRetrieveExtCell#cleanup');
      refMount.current = false;
    };
  }, [refreshExtCellRoleList]);

  return { loading, roleList, refreshExtCellRoleList };
}

export function useRetrieveExtCell(
  cellUrl: PersoniumCellUrl,
  access_token: string
): {
  loading: boolean;
  foundCell: null | ExtCellData;
  retrieveExtCell: () => Promise<void>;
} {
  const [loading, setLoading] = useState(true);
  const [foundCell, setFoundCell] = useState<null | ExtCellData>(null);

  const refMount = useRef(true);
  const query: ODataQueryParameters = useMemo(() => {
    // check is cell in same unit ?
    const url =
      cellUrl.UnitFQDN === 'demo-jp.personium.io'
        ? 'personium-localunit:/app-ishiguro-01/'
        : 'https://app-ishiguro-01.demo-jp.personium.io/';
    return {
      $filter: `Url eq '${url}'`,
    };
  }, [cellUrl]);

  const retrieveExtCell = useCallback(async () => {
    const result = await getExternalCellList(cellUrl, access_token, query);
    console.log(refMount.current, result.d.results);
    if (refMount.current === false) return;
    setFoundCell(result.d.results.length > 0 ? result.d.results[0] : null);
    setLoading(false);
    console.log('useRetrieveExtCell#retrieveExtCell done');
  }, [cellUrl, access_token, query]);

  useEffect(() => {
    setLoading(true);
    refMount.current = true;
    retrieveExtCell();
    return function cleanup() {
      console.log('useRetrieveExtCell#cleanup');
      refMount.current = false;
    };
  }, [retrieveExtCell]);

  return { loading, foundCell, retrieveExtCell };
}
