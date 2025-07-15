import { QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../frontend/src/infrastructure/providers/AuthProvider';
import { AppNavigator } from '../frontend/src/presentation/navigation/AppNavigator';
import { queryClient } from '../frontend/src/infrastructure/services/queryClient';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}