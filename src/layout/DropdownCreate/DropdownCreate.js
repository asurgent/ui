import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from '@material-ui/icons';
import * as U from './DropdownCreate.styled';
import * as Button from '../../Button';
import * as Shield from '../../Shield';
import * as Transition from '../../Transition';


const btnPropTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func,
  icon: PropTypes.instanceOf(Object),
};
const btnDefaultProps = {
  onClick: null,
  title: '',
  description: '',
  onClose: null,
  icon: null,
};

const CreateItemButton = ({
  onClick,
  title,
  description,
  onClose,
  icon: IconComponent,
}) => (
  <Button.Plain onClick={() => { onClick(); onClose(); }}>
    <U.CreateItem>
      <IconComponent className="create-icon" fontSize="large" />
      <U.CreateTitle>{title}</U.CreateTitle>
      <U.CreateDescription>{description}</U.CreateDescription>
    </U.CreateItem>
  </Button.Plain>
);

CreateItemButton.propTypes = btnPropTypes;
CreateItemButton.defaultProps = btnDefaultProps;

const dropdownPropTypes = {
  isOpen: PropTypes.bool.isRequired,
  createActionList: PropTypes.instanceOf(Array).isRequired,
  onClose: PropTypes.func.isRequired,
};

const dropdownDefaultProps = {};

const DropdownCreate = ({
  createActionList,
  isOpen,
  onClose,
}) => (
  <>
    <Shield.Transparent onClick={onClose} shieldIsUp={isOpen}>
      <U.MenuWrapper>
        <U.Desktop>
          <Transition.FadeInSlideDown isVisible={isOpen} timeout={80}>
            <U.DesktopMenu>
              {
              createActionList
                .map((action) => (
                  <CreateItemButton
                    key={action.title}
                    icon={action.icon}
                    title={action.title}
                    description={action.description}
                    onClick={action.onClick}
                    onClose={onClose}
                  />
                ))
            }
            </U.DesktopMenu>
          </Transition.FadeInSlideDown>
        </U.Desktop>

        <U.Mobile>
          <Transition.FadeIn isVisible={isOpen} timeout={80}>
            <U.MobileMenu>
              <Button.Icon className="close" onClick={onClose} icon={<Icon.Close fontSize="large" />} />
              <U.MobileContent>
                {
                  createActionList
                    .map((action) => (
                      <CreateItemButton
                        icon={action.icon}
                        key={action.title}
                        title={action.title}
                        description={action.description}
                        onClick={action.onClick}
                        onClose={onClose}
                      />
                    ))
              }
              </U.MobileContent>
            </U.MobileMenu>
          </Transition.FadeIn>
        </U.Mobile>
      </U.MenuWrapper>
    </Shield.Transparent>
  </>

);

DropdownCreate.propTypes = dropdownPropTypes;
DropdownCreate.defaultProps = dropdownDefaultProps;
DropdownCreate.displayName = '@asurgent.ui.layout.DropdownCreate';

export default DropdownCreate;
