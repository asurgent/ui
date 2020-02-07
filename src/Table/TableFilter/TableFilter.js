import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
// import { sortDirection as direction } from '../helpers';
import * as Form from '../../Form';
import * as Button from '../../Button';
import * as Shield from '../../Shield';
import * as C from './TableFilter.styled';
import * as Transition from '../../Transition';

const propTypes = {
  provider: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};


const FilterItem = ({ included, excluded, label }) => (
  <C.FilterItem>
    <C.Active>
      {included && <Icons.Check />}
      {excluded && <Icons.Block />}
    </C.Active>
    <Button.Plain className="filter-label">
      {label}
    </Button.Plain>
    <Button.Plain tooltip="exclude">
      <C.Exclude>
        <Icons.RemoveCircleOutline />
      </C.Exclude>
    </Button.Plain>

  </C.FilterItem>
);

const Filter = ({ label, items }) => {
  const formData = Form.useFormBuilder({
    search: {
      type: 'text', value: '', noLabel: true,
    },
  });

  const [open, setOpen] = useState(false);
  return (
    <C.Filter>
      <Button.Filter onClick={() => setOpen(true)}>{label}</Button.Filter>
      <Shield.Transparent onClick={() => setOpen(false)} shieldIsUp={open}>
        <Transition.FadeInSlideDown isVisible={open} timeout={80}>
          <C.Dropdown>
            <C.Header>
                Filter by
              {' '}
              {label}
            </C.Header>
            <C.Search>
              <Form.Primary
                form={formData}
                onNewValue={(values) => {
                  console.log(values.search);
                }}
              >
                {({ search }) => (
                  <>
                    {search}
                  </>
                )}
              </Form.Primary>
            </C.Search>
            <C.List>
              {
                items.map(({ label, included, excluded }) => (
                  <FilterItem included={included} excluded={excluded} label={label} />
                ))
              }
            </C.List>
          </C.Dropdown>
        </Transition.FadeInSlideDown>
      </Shield.Transparent>
    </C.Filter>
  );
};

const TableFilter = (props) => {
  const { provider } = props;

  const customers = [
    { label: '1133', excluded: true },
    { label: '123' },
    { label: '4465', included: true },
    { label: '984' },
  ];


  return (
    <C.Wrapper>
      {
      provider.getFilter().map(({ label }) => (
        <Filter label={label} items={customers} />
      ))
      }


    </C.Wrapper>
  );
};

TableFilter.propTypes = propTypes;
TableFilter.defaultProps = defaultProps;
TableFilter.displayName = '@asurgent.ui.Table.Searchbar';

export default TableFilter;
