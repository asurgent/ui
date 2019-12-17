import React from 'react';
import PropTypes from 'prop-types';
import { TagsCollection, SpillOver } from './Tag.styled';
import TagSingle from './TagSingle';

const propTypes = {
  max: PropTypes.number,
  tags: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string })),
  ]).isRequired,
};

const defaultProps = {
  max: 0,
};

const TagCollection = ({ tags, max }) => {
  let spillOver = 0;
  let tagsList = tags;
  if (max > 0) {
    tagsList = [...tags].splice(0, max);

    if (tagsList.length < tags.length) {
      spillOver = tags.length - max;
    }
  }

  return (
    <TagsCollection>
      {
        tagsList.map((tag, index) => {
          const time = new Date().getTime();
          const key = (label) => `${index}${label}${time}`;

          if (typeof tag === 'object' && tag.label) {
            return <TagSingle key={key(tag.label)} label={tag.label} />;
          }

          return <TagSingle key={key(tag.toString())} label={tag.toString()} />;
        })
      }
      {spillOver > 0 && <SpillOver>{`+${spillOver}`}</SpillOver>}
    </TagsCollection>
  );
};

TagCollection.propTypes = propTypes;
TagCollection.defaultProps = defaultProps;

export default TagCollection;
