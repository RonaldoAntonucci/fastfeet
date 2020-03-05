import React, { useMemo } from 'react';

import {
  Container,
  Content,
  Label,
  LabelText,
  StepContainer,
  StepContent,
  Ellipse,
  Line,
} from './styles';

export default function ProgressSteps({ current, labels }) {
  const Labels = useMemo(
    () =>
      labels.map(label => (
        <StepContainer key={label}>
          <Label>
            {label.split(' ').map(text => (
              <LabelText key={text}>{text}</LabelText>
            ))}
          </Label>
        </StepContainer>
      )),
    [labels]
  );

  const Steps = useMemo(
    () =>
      labels.map((label, index) => (
        <StepContainer key={label}>
          <StepContent>
            <Line transparent={index !== 0} />
            <Ellipse current={index <= current} />
            <Line transparent={labels.length - 1 !== index} />
          </StepContent>
        </StepContainer>
      )),
    [current, labels]
  );

  return (
    <Container>
      <Content>{Steps}</Content>
      <Content>{Labels}</Content>
    </Container>
  );
}
