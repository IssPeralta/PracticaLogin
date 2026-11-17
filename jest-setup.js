// Mock Expo Winter runtime
global.__ExpoImportMetaRegistry = {};

// Mock structuredClone si no está disponible de forma nativa en el entorno de pruebas
global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));

// Mock expo modules y router
jest.mock('expo', () => ({}));
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}), { virtual: true }); // <-- Ojo: Dejé el { virtual: true } porque en tu proyecto no está instalado expo-router

jest.mock('expo-constants', () => ({
  default: {},
}), { virtual: true }); // <-- Igual aquí