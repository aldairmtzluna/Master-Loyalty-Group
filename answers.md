### 1. Enumera 3 amenazas comunes en apps móviles bancarias y cómo las mitigarías

1. **Almacenamiento inseguro de datos sensibles**:
   - Mitigación: Usar almacenamiento seguro como Keychain (iOS) o EncryptedSharedPreferences (Android). Nunca almacenar tokens o credenciales en texto plano.

2. **Interceptación de comunicación (Man-in-the-Middle)**:
   - Mitigación: Implementar certificate pinning, usar siempre HTTPS, validar certificados del servidor.

3. **Inyección de código o reverse engineering**:
   - Mitigación: Ofuscar el código, usar herramientas como ProGuard, implementar detección de root/jailbreak.

### 2. Explica las diferencias entre almacenamiento seguro en iOS y Android

- **iOS (Keychain)**:
  - Almacenamiento a nivel de sistema operativo
  - Los datos están encriptados por hardware en dispositivos con Secure Enclave
  - Accesible solo por la app que lo guardó (a menos que se configure compartido)
  - Persiste entre instalaciones si se usa el mismo bundle ID

- **Android (EncryptedSharedPreferences/Keystore)**:
  - Keystore proporciona almacenamiento seguro para claves criptográficas
  - EncryptedSharedPreferences encripta datos con claves gestionadas por Keystore
  - Más configurable pero también más complejo de implementar correctamente
  - No persiste entre instalaciones

### 3. ¿Cómo aplicarías el patrón Adapter al integrar EncryptedStorage?

El patrón Adapter se aplicaría creando una interfaz común para almacenamiento seguro que luego se implementaría con EncryptedStorage:

```typescript
interface SecureStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

class EncryptedStorageAdapter implements SecureStorage {
  async getItem(key: string) {
    return await EncryptedStorage.getItem(key);
  }
  
  async setItem(key: string, value: string) {
    await EncryptedStorage.setItem(key, value);
  }
  
  async removeItem(key: string) {
    await EncryptedStorage.removeItem(key);
  }
}