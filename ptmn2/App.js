import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <ImageBackground
      source={require('../output.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
});
