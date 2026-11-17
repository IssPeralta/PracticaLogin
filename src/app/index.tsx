import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressLogin = () => {
    if (!email && !password) {
      Alert.alert('Error', 'Los campos están vacíos');
      return;
    }
    if (!email) {
      Alert.alert('Error', 'El email está vacío');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'La contraseña está vacía');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Email inválido');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      Alert.alert('Error', 'La contraseña debe tener una mayúscula');
      return;
    }
    if (!/[a-z]/.test(password)) {
      Alert.alert('Error', 'La contraseña debe tener una minúscula');
      return;
    }
    if (!/[0-9!@#$%^&*]/.test(password)) {
      Alert.alert('Error', 'La contraseña debe tener un número o carácter especial');
      return;
    }

    router.push('/success');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        testID="email-input"
      />
      
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
        testID="password-input"
      />
      
      {/* AQUÍ ESTABA EL ERROR: Faltaba el testID */}
      <Button 
        title="Iniciar Sesión" 
        onPress={onPressLogin} 
        testID="login-button" 
      />

      <View style={{ marginTop: 20 }}>
        <Button 
          title="Ir a Registro" 
          color="#841584" 
          onPress={() => router.push('/register')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 }
});