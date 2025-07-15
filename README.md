# Master-Loyalty-Group
 Technical exam – Mobile React Native Senior + .NET


# Examen Técnico - React Native + .NET

## Arquitectura y Patrones Implementados

### Backend (.NET 8+)
- **Clean Architecture**: Separación en capas (Domain, Application, Infrastructure, WebAPI)
- **CQRS**: Uso de MediatR para separar comandos y consultas
- **Repository Pattern**: Para abstraer el acceso a datos
- **Dependency Injection**: Inyección de servicios en controladores
- **JWT Authentication**: Autenticación segura con tokens

### Frontend (React Native)
- **Clean Architecture**: Separación en capas (domain, data, infrastructure, presentation)
- **Repository Pattern**: Para abstraer llamadas a la API
- **Adapter Pattern**: Encapsulamiento de react-native-encrypted-storage
- **Observer Pattern**: Zustand para manejo de estado global
- **Strategy Pattern**: Diferentes implementaciones de almacenamiento seguro
- **Factory Pattern**: Creación de instancias de servicios

## Seguridad Implementada

### Backend
- Validación de entrada en endpoints
- Hashing de contraseñas con BCrypt
- JWT con expiración y firma segura
- HTTPS obligatorio
- Protección contra ataques CSRF

### Frontend
- Almacenamiento seguro con react-native-encrypted-storage
- Tokens JWT nunca en localStorage
- Interceptores para manejo de tokens
- Protección de rutas
- Limpieza segura al hacer logout

## Estado Global y Datos
- **Zustand**: Para estado de autenticación global
- **React Query**: Para manejo de datos asíncronos
  - Caching automático
  - Reintentos inteligentes
  - Refetching en focus
  - Optimistic updates

## Escalabilidad
- Arquitectura modular fácil de extender
- Inyección de dependencias para fácil testing
- Separación clara de responsabilidades
- Patrones que facilitan la adición de nuevas features