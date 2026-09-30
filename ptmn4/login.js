import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Login</Text>
      <Button
        title="Belum punya akun? Daftar di sini"
        onPress={() => navigation.navigate('Signup')}
      />
      <View style={styles.buttonSpacing} />
      <Button title="Masuk ke aplikasi" onPress={() => navigation.navigate('Main')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  buttonSpacing: { height: 12 }
});