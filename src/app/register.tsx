import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onPressRegister = () => {
    // 1. Validar que ningún campo esté vacío
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Ninguno de los campos debe estar vacío');
      return;
    }

    // 2. El email debe ser validado con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'El formato del email es inválido');
      return;
    }

    // 3. Los campos de contraseña deben coincidir
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // 4. La contraseña debe tener al menos 8 caracteres
    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // 5. Mayúsculas y minúsculas
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      Alert.alert('Error', 'La contraseña debe contener mayúsculas y minúsculas');
      return;
    }

    // 6. Al menos 1 carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos un carácter especial');
      return;
    }

    // ¡Si pasa todas las validaciones, mandar al Index (Login)!
    Alert.alert('Éxito', 'Registro completado correctamente', [
      { text: 'OK', onPress: () => router.push('/') } // Redirige al Index
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      
      {/* secureTextEntry oculta los caracteres */}
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} 
        style={styles.input}
      />
      
      <TextInput
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      
      <Button title="Registrarse" onPress={onPressRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { 
    borderWidth: 1, 
    borderColor: '#f5b041', // Color amarillento como en la imagen
    padding: 10, 
    marginBottom: 15, 
    borderRadius: 5 
  }
});