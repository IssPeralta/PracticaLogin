import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* 1. Tus pantallas con configuraciones personalizadas */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="success" options={{ headerShown: false }} />
      
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Registro',
          headerStyle: { backgroundColor: '#7a8b99' },
          headerTintColor: '#fff',
        }} 
      />

      {/* 2. La pantalla que te faltaba (la que sale en la imagen) */}
      <Stack.Screen name="home" />
    </Stack>
  );
}