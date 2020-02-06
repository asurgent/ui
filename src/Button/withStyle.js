import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import withThemeOverride from 'high-order-components/withTheme';
import withMapProps from 'high-order-components/withMapProps';
import Button from './Button';

const withStyle = (theme) => (Style) => {
  const mapper = (props) => ({ renderStyle: Style, ...props });

  return withThemeOverride(theme)(
    withTheme(
      withRouter(
        withMapProps(mapper)(Button),
      ),
    ),
  );
};

export default withStyle;
