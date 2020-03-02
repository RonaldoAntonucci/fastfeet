import React from 'react';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import colors from '~/styles/colors';

import {
  Container,
  TitleContainer,
  BackButton,
  TitleContent,
  Title,
  Content,
  Icon,
  NoScroll,
} from './styles';

export default function PageContainer({ children, title, handleBack, scroll }) {
  return (
    <Background>
      <Container>
        <TitleContainer>
          <BackButton onPress={handleBack}>
            <Icon name="keyboard-arrow-left" color={colors.bg} />
          </BackButton>
          <TitleContent>
            <Title>{title}</Title>
          </TitleContent>
        </TitleContainer>
        {scroll ? (
          <Content>{children}</Content>
        ) : (
          <NoScroll>{children}</NoScroll>
        )}
      </Container>
    </Background>
  );
}

PageContainer.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  handleBack: PropTypes.func,
  scroll: PropTypes.bool,
};

PageContainer.defaultProps = {
  handleBack: () => {},
  scroll: false,
};
