import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Form } from '@rocketseat/unform';
import { MdAdd, MdSearch } from 'react-icons/md';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { StyledTitle } from './styles';

import colors from '~/styles/colors';

function Title({ title, handleSearchSubmit, buttonLink, loading }) {
  return (
    <StyledTitle>
      <h1>{title}</h1>

      <div>
        <Form onSubmit={handleSearchSubmit}>
          <button type="submit" disabled={loading}>
            <MdSearch color={colors.fontLigh} />
          </button>

          <Input
            type="text"
            name="search"
            placeholder="Buscar por encomendas"
            disabled={loading}
          />
        </Form>
        <Link to={buttonLink}>
          <Button icon={MdAdd} type="button">
            CADASTRAR
          </Button>
        </Link>
      </div>
    </StyledTitle>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  buttonLink: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Title.defaultProps = {
  loading: false,
};

export default memo(Title);
