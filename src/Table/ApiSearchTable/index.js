import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import ApiSearchTable from './ApiSearchTable';
import { getDefaultSort, generatePayloadSortString } from './helpers';

const propTypes = {
  provider: PropTypes.instanceOf(Object).isRequired,
  useHistoryState: PropTypes.bool,
  historyStatePrefix: PropTypes.string,
  sortKeys: PropTypes.instanceOf(Array),
};

const defaultProps = {
  useHistoryState: false,
  historyStatePrefix: '',
  sortKeys: [],
};

const TableRenderProxy = (props) => {
  const {
    provider,
    useHistoryState,
    historyStatePrefix,
    sortKeys,
  } = props;
  const history = useHistory();
  const location = useLocation();
  const [initialSort, setInitialSort] = useState(null);

  useEffect(() => {
    if (sortKeys && Array.isArray(sortKeys) && sortKeys.length) {
      const deaultSort = getDefaultSort(sortKeys);

      setInitialSort(deaultSort);
    }

    if (useHistoryState) {
      provider.enableHistoryState({ history, location, prefix: historyStatePrefix || '' });
    }
  }, []);

  if (provider.isMounted) {
    return <ApiSearchTable {...props} initialSort={initialSort} />;
  }

  return null;
};

TableRenderProxy.propTypes = propTypes;
TableRenderProxy.defaultProps = defaultProps;

export default TableRenderProxy;
