import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import * as T from '../../../Typography';
import * as Tag from '../../../Tag';
import Tooltip from '../../Tooltip';
import * as C from './EntityTooltipCard.styled';
import translation from './EntityTooltipCard.translation';

const { t } = translation;

const defaultProps = {
  position: '',
  id: '',
  name: '',
  type: '',
  resourceGroup: '',
  region: '',
  displayName: '',
  tags: [],
  hasCloudops: false,
};

const propTypes = {
  position: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  resourceGroup: PropTypes.string,
  region: PropTypes.string,
  displayName: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  hasCloudops: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

const EntityTooltipCard = (props) => {
  const {
    id,
    type,
    tags,
    name,
    region,
    resourceGroup,
    displayName,
    position,
    children,
    hasCloudops,
  } = props;

  return (
    <Tooltip
      position={position}
      isCard
      header={(
        <C.Header>
          <C.EntityName hasCloudops={hasCloudops}>
            <MdiIcon
              path={hasCloudops ? mdiEye : mdiEyeOff}
              size={1}
            />
            <T.P.Main bold>{name}</T.P.Main>
          </C.EntityName>
          <T.P.Small>{`ID ${id}`}</T.P.Small>
        </C.Header>
      )}
      content={(
        <C.Content>
          <T.P.Main bold>{displayName}</T.P.Main>
          <T.P.Small>
            <C.Gray>{`${t('entityType', 'asurgentui')} `}</C.Gray>
            {type || 'N/A'}
          </T.P.Small>

          <T.P.Small>
            <C.Gray>{`${t('resourceGroup', 'asurgentui')} `}</C.Gray>
            {resourceGroup || 'N/A'}
          </T.P.Small>

          <T.P.Small>
            <C.Gray>{`${t('entityType', 'asurgentui')} `}</C.Gray>
            {type || 'N/A'}
          </T.P.Small>

          <T.P.Small>
            <C.Gray>{`${t('region', 'asurgentui')} `}</C.Gray>
            {region || 'N/A'}
          </T.P.Small>
          <Tag.Collection tags={tags} maxTags={3} style={{ marginTop: '0.8rem' }} />
        </C.Content>
      )}
    >
      {children}
    </Tooltip>
  );
};

EntityTooltipCard.propTypes = propTypes;
EntityTooltipCard.defaultProps = defaultProps;

export default EntityTooltipCard;
