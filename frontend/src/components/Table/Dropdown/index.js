import React from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';
import { Container, Arrow, MoreButton } from './styles';

export default function Dropdown({ children }) {
  return (
    <Container>
      <MoreButton>
        <MdMoreHoriz size={24} color="#C6C6C6" />
      </MoreButton>

      <div>
        <Arrow />
        <div>{children}</div>
      </div>
    </Container>
  );
}

Dropdown.propTypes = {
  children: PropTypes.element.isRequired,
};
