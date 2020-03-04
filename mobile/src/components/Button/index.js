import React, { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';

import PropTypes from 'prop-types';

import { Container, Text } from './styles';

import colors from '~/styles/colors';

export default function Button({ children, loading, onPress, ...rest }) {
  const handleClick = useMemo(() => (loading ? () => {} : onPress), [
    loading,
    onPress,
  ]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Container {...rest} onPress={handleClick}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}
Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  loading: false,
  onPress: () => {},
};
