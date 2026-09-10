import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Nama : mohamad fariz rachman pratama</Text>
<Text>Tempat tanggal lahir : Cirebon, 1 maret 2006</Text>
<Text>Cita cita : Financial freedom</Text>
<Text>Rencana hidup : setelah kuliah saya berencana membangun usaha laundry, lalu jika laundry sudah berjalan dan banyak pelanggan saya akan mulai ternak ayam broiler untuk bisnis telur dan daging<\Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
