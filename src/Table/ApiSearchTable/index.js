import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import ApiSearchTable from './ApiSearchTable';

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

  useEffect(() => {
    if (sortKeys && Array.isArray(sortKeys) && sortKeys.length) {
      provider.setSortKeys(sortKeys);
    }

    if (useHistoryState) {
      provider.enableHistoryState({ history, location, prefix: historyStatePrefix || '' });
    }
  }, []);

  if (provider.isMounted) {
    return <ApiSearchTable {...props} />;
  }

  return null;
};

TableRenderProxy.propTypes = propTypes;
TableRenderProxy.defaultProps = defaultProps;

export default TableRenderProxy;
