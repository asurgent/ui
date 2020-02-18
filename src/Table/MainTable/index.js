import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import MainTable from './MainTable';

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

const MainTableProxy = (props) => {
  const {
    tableHook,
    useHistoryState,
    historyStatePrefix,
  } = props;

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (useHistoryState) {
      tableHook.enableHistoryState({ history, location, queryPrefix: historyStatePrefix || '' });
    }
  }, []);

  if (tableHook.isReady) {
    return <MainTable {...props} />;
  }

  return null;
};

MainTableProxy.propTypes = propTypes;
MainTableProxy.defaultProps = defaultProps;
MainTableProxy.displayName = '@asurgent.ui.Table.Proxy.Main';

export default MainTableProxy;