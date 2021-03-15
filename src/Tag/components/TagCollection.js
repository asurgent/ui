import React from 'react';
import PropTypes from 'prop-types';
import { TagsCollection, SpillOver } from './Tag.styled';
import TagSingle from './TagSingle';

const propTypes = {
  maxTags: PropTypes.number,
  maxLength: PropTypes.number,
  style: PropTypes.instanceOf(Object),
  tags: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string })),
  ]).isRequired,
};

const defaultProps = {
  style: {},
  maxTags: 0,
  maxLength: 0,
};

const TagCollection = ({
  tags, maxTags, maxLength, style,
}) => {
  let spillOver = 0;
  let tagsList = tags;
  if (maxTags > 0) {
    tagsList = [...tags].splice(0, maxTags);

    if (tagsList.length < tags.length) {
      spillOver = tags.length - maxTags;
    }
  }

  return (
    <TagsCollection style={style}>
      {
        tagsList.map((tag, index) => {
          const time = new Date().getTime();
          const key = (label) => `${index}${label}${time}`;

          if (typeof tag === 'object' && tag.value) {
            return (
              <TagSingle
                onDelete={tag.onDelete ? tag.onDelete : false}
                key={key(tag.value)}
                label={tag.value}
                maxLength={maxLength}
              />
            );
          }

          return (
            <TagSingle
              key={key(tag.toString())}
              label={tag.toString()}
              maxLength={maxLength}
            />
          );
        })
      }
      {spillOver > 0 && <SpillOver>{`+${spillOver}`}</SpillOver>}
    </TagsCollection>
  );
};

TagCollection.propTypes = propTypes;
TagCollection.defaultProps = defaultProps;

export default TagCollection;
