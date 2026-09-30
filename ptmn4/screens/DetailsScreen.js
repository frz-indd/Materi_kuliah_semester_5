import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Praktikum 4</Text>
      <Text style={styles.description}>Layar ini dibuka dari Home melalui Stack Navigator.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: 'bold' },
  description: { fontSize: 16, textAlign: 'center' }
});