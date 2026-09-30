import React from 'react';
import { ContainerButton, ButtonText } from './styles';
import type { FabButtonProps } from '../../types/models';

function FabButton({ setVisible }: FabButtonProps) {
  return (
    <ContainerButton
      activeOpacity={0.9}
      onPress={setVisible}
    >
      <ButtonText>+</ButtonText>
    </ContainerButton>
  );
}

export default FabButton;