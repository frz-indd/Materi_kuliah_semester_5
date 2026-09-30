import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Beranda</Text>
      <Text style={styles.description}>Navigasi utama menggunakan Drawer dan Bottom Tabs.</Text>
      <Button title="Buka detail praktikum" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  description: { fontSize: 16, textAlign: 'center' }
});