import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import ApiTable from './ApiTable';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  useHistoryState: PropTypes.bool,
  historyStatePrefix: PropTypes.string,
  sortKeys: PropTypes.instanceOf(Array),
};

const defaultProps = {
  useHistoryState: false,
  historyStatePrefix: '',
  sortKeys: [],
};

const ApiTableProxy = (props) => {
  const {
    tableHook,
    useHistoryState,
    historyStatePrefix,
    sortKeys,
  } = props;
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (sortKeys && Array.isArray(sortKeys) && sortKeys.length) {
      tableHook.setSortKeys(sortKeys);
    }

    if (useHistoryState) {
      tableHook.enableHistoryState({ history, location, prefix: historyStatePrefix || '' });
    }
  }, []);

  if (tableHook.isMounted) {
    return <ApiTable {...props} />;
  }

  return null;
};

ApiTableProxy.propTypes = propTypes;
ApiTableProxy.defaultProps = defaultProps;
ApiTableProxy.displayName = '@asurgent.ui.Table.Proxy.Api';

export default ApiTableProxy;
