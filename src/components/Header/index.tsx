import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Title, Container } from './styles';

export default function Header() {
  return (
    <Container>
      <Title>
        Dev
        <Text style={styles.titulo}>Post</Text>
      </Title>
    </Container>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontStyle: 'italic',
    color: '#e52246',
  },
});
