import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Registro Exitoso!</Text>
      <Text style={styles.subtitle}>Has iniciado sesión correctamente.</Text>
      <Button title="Regresar al Login" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'green', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
});