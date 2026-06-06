import { router } from 'expo-router';

import { useAuth } from '@/controllers/use-auth';
import { LoginView } from '@/views/login-view';

/**
 * Ruta "/" → Login. Conecta el controller (useAuth) con la view.
 *
 * TODO (ustedes): en useAuth.enviar(), tras autenticar, navegar al área
 * autenticada. Acá dejamos la navegación de ejemplo para el template.
 */
export default function LoginScreen() {
  const { email, password, setEmail, setPassword, cargando, error, enviar } = useAuth();

  function onSubmit() {
    enviar();
    // TODO: navegar solo si el login fue exitoso. En el template entramos directo.
    router.replace('/home');
  }

  return (
    <LoginView
      email={email}
      password={password}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onSubmit={onSubmit}
      loading={cargando}
      error={error}
    />
  );
}
