import Alert from '@/components/Alert';
import clientAxios from '@/config/axios';
import { userPaths, authPaths } from '@/constants/routerPaths';
import { Variant } from '@/constants/variantsAlert';
import useAlert from '@/hooks/useAlert';
import useAuth from '@/hooks/useAuth';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spinner,
} from '@nextui-org/react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert } = useAlert();
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    showAlert('', false);

    if ([initialValues.email, initialValues.password].includes('')) {
      showAlert('Todos los campos son requeridos', true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(initialValues.email)) {
      showAlert('Por favor, introduce un email válido', true);
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await clientAxios.post(
        `/users/${authPaths.root}/login`,
        initialValues
      );

      showAlert('Autenticación exitosa', false);
      localStorage.setItem('blog_app_token', data.token);

      const profileResponse = await clientAxios(
        `/users/${userPaths.root}/${userPaths.profile}`,
        { headers: { Authorization: `Bearer ${data.token}` } }
      );
      setAuth({ ...profileResponse.data, token: data.token });
      navigate(`/${userPaths.root}/${userPaths.home}`);

      setInitialValues({
        email: '',
        password: '',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(error.response?.data.message, true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-lg p-10 bg-black/50 border border-purple-500/70">
      <CardHeader>
        <h2 className="text-animate text-4xl text-white font-semibold">
          Inicia Sesión
        </h2>
      </CardHeader>
      <CardBody>
        <p className="text-gray-400 font-normal text-medium ">
          Accede a tu cuenta y sigue disfrutando de nuestras funcionalidades
          exclusivas. ¡Te hemos extrañado!
        </p>

        <div className="w-full mx-auto">
          {alert.message && (
            <div className="my-2">
              <Alert
                message={alert.message}
                variant={alert.error ? Variant.ERROR : Variant.SUCCESS}
              />
            </div>
          )}
          {isLoading && (
            <div className="flex items-center justify-center">
              <Spinner label="Iniciando Sesión" color="secondary" />
            </div>
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
              isRequired
              value={initialValues.email}
              onChange={(e) =>
                setInitialValues({ ...initialValues, email: e.target.value })
              }
            />
            <Input
              type="password"
              label="Contraseña"
              color="secondary"
              variant="faded"
              isRequired
              value={initialValues.password}
              onChange={(e) =>
                setInitialValues({ ...initialValues, password: e.target.value })
              }
            />
            <Link
              to={`/${authPaths.root}/${authPaths.forgotPassword}`}
              className="text-gray-300 hover:text-gray-400 transition-all"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <Button
              type="submit"
              fullWidth
              className="bg-custom-gradient-purple font-bold text-white tracking-wider mt-2"
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </CardBody>
      <CardFooter className="justify-center">
        <p className="text-gray-400 font-normal text-medium">
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

export default SignInPage;
