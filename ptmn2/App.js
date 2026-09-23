import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Saya</Text>

      <Text style={styles.label}>
        Nama : <Text style={styles.value}>mohamad fariz rachman pratama</Text>
      </Text>
      <Text style={styles.label}>
        Tempat tanggal lahir : <Text style={styles.value}>Cirebon, 1 Maret 2006</Text>
      </Text>
      <Text style={styles.label}>
        Cita-cita : <Text style={styles.value}>Financial freedom</Text>
      </Text>
      <Text style={styles.label}>
        Rencana hidup : <Text style={styles.value}>Setelah kuliah saya berencana membangun usaha sebagai sampingan, lalu jika usaha yang saya jalankan sudah berjalan dan banyak pelanggan, saya akan mulai ternak ayam broiler untuk bisnis telur dan daging.</Text>
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: '#111827',
  },
  value: {
    fontWeight: 'normal',
    color: '#374151',
  },
});
