import Alert from '@/components/Alert';
import clientAxios from '@/config/axios';
import { authPaths } from '@/constants/routerPaths';
import { Variant } from '@/constants/variantsAlert';
import useAlert from '@/hooks/useAlert';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  CardFooter,
} from '@nextui-org/react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>('');
  const { alert, showAlert } = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || email.length < 6 || !emailRegex.test(email)) {
      showAlert('Por favor, introduce un email válido', true);
      return;
    }

    try {
      const { data } = await clientAxios.post(
        `/users/${authPaths.root}/${authPaths.forgotPassword}`,
        {
          email,
        }
      );
      showAlert(data.message, false);

      setTimeout(() => {
        navigate(`/${authPaths.root}/${authPaths.signIn}`);
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(error.response?.data.message, true);
      }
    }
  };

  return (
    <Card className="max-w-lg p-10 bg-black/50 border border-purple-500/70">
      <CardHeader>
        <h2 className="text-animate text-4xl text-white font-semibold">
          ¿Olvidaste tu contraseña?
        </h2>
      </CardHeader>
      <CardBody>
        <p className="text-gray-400 font-normal text-medium ">
          No te preocupes, podemos ayudarte a recuperarla. Simplemente ingresa
          tu dirección de correo electrónico a continuación y te enviaremos un
          enlace para restablecer tu contraseña.
        </p>

        <div className="w-full mx-auto">
          {alert.message && (
            <Alert
              message={alert.message}
              variant={alert.error ? Variant.ERROR : Variant.SUCCESS}
            />
          )}
          <form
            className="flex flex-col gap-3 mt-5 items-end"
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              label="Email"
              color="secondary"
              variant="faded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              className="bg-custom-gradient-purple font-bold text-white tracking-wider mt-2"
            >
              Enviar enlace
            </Button>
          </form>
        </div>
      </CardBody>
      <CardFooter className="flex-col justify-center items-start gap-1">
        <p className="text-gray-400 font-normal text-medium text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link
            to={`/${authPaths.root}/${authPaths.signIn}`}
            className="text-purple-500 hover:text-purple-600 transition-all"
          >
            Inicia sesión aquí
          </Link>
        </p>
        <p className="text-gray-400 font-normal text-medium text-center">
          ¿Aún no tienes una cuenta?{' '}
          <Link
            to={`/${authPaths.root}/${authPaths.signUp}`}
            className="text-purple-500 hover:text-purple-600 transition-all"
          >
            Regístrate aquí
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordPage;
