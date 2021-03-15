import React, {
  useState,
  createRef,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import * as C from './VirtualRender.styled';

const propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.func.isRequired,
  rowHeight: PropTypes.number,
  style: PropTypes.instanceOf(Object),
};

const defaultProps = {
  rowHeight: 35,
  style: {},
};

const VirtualRender = (props) => {
  const {
    items,
    rowHeight,
    children,
    style,
  } = props;

  const wrapperRef = createRef();
  const itemsRef = createRef();

  const [position, setPosition] = useState(0);
  const [index, setIndex] = useState(0);
  const [itemRenderCount, setItemRenderCount] = useState(0);

  useLayoutEffect(() => {
    const height = (wrapperRef.current.offsetHeight);
    setItemRenderCount(Math.ceil((height / rowHeight)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, index]);

  const onScroll = () => {
    const { scrollTop } = wrapperRef.current;

    const maxScroll = ((items.length * rowHeight)) - itemsRef.current.offsetHeight;
    const scrollPostition = Math.max(0, Math.min(scrollTop, maxScroll));
    const scrollIndex = Math.ceil(scrollPostition / rowHeight);

    setPosition(scrollPostition);
    setIndex(scrollIndex);
  };

  useLayoutEffect(() => {
    onScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <C.Wrapper onScroll={onScroll} ref={wrapperRef} style={style}>
      <C.ScrollContainer
        count={items.length}
        rowHeight={rowHeight}
      >
        <C.ItemsContainer
          ref={itemsRef}
          style={{ top: `${position}px` }}
          count={itemRenderCount}
          rowHeight={rowHeight}
        >
          {
            [...items]
              .splice(index, itemRenderCount)
              .map((item, i) => children(item, i))
          }
        </C.ItemsContainer>
      </C.ScrollContainer>
    </C.Wrapper>
  );
};

VirtualRender.propTypes = propTypes;
VirtualRender.defaultProps = defaultProps;

export default VirtualRender;
