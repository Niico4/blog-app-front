import Alert from '@/components/common/Alert';
import clientAxios from '@/config/axios';
import { userPaths, authPaths } from '@/constants/routerPaths';
import { Variant } from '@/constants/variantsAlert';
import useAlert from '@/hooks/useAlert';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  CardFooter,
  Spinner,
} from '@nextui-org/react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface InitialValues {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const [initialValues, setInitialValues] = useState<InitialValues>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert } = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, lastName, email, password, confirmPassword } = initialValues;

    showAlert('', false);

    if ([name, lastName, email, password, confirmPassword].includes('')) {
      showAlert('Todos los campos son requeridos', true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Por favor, introduce un email válido', true);
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Las contraseñas no coinciden', true);
      return;
    }

    if (password.length < 6) {
      showAlert('La contraseña debe tener al menos 6 caracteres', true);
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      showAlert(
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
        true
      );
      return;
    }

    setIsLoading(true);

    try {
      await clientAxios.post(
        `/users/${authPaths.root}/register`,
        initialValues
      );
      showAlert('Usuario registrado exitosamente', false);

      setInitialValues({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(error.response?.data.message, true);
      }
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => {
      navigate(`/${userPaths.root}/${userPaths.home}`);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInitialValues({
      ...initialValues,
      [name]: value,
    });
  };

  return (
    <Card className="max-w-lg p-10 bg-black/50 border border-purple-500/70">
      <CardHeader>
        <h2 className="text-animate text-4xl text-white font-semibold">
          Crea tu Cuenta
        </h2>
      </CardHeader>
      <CardBody>
        <p className="text-gray-400 font-normal text-medium ">
          Únete a nuestra comunidad y empieza a disfrutar de una experiencia
          única. ¡Regístrate ahora para descubrir todo lo que tenemos para
          ofrecerte
        </p>

        <div className="w-full mx-auto mt-8">
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
              <Spinner label="Creando usuario" color="secondary" />
            </div>
          )}
          <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Nombre"
              name="name"
              color="secondary"
              variant="faded"
              isRequired
              value={initialValues.name}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              label="Apellido"
              name="lastName"
              color="secondary"
              variant="faded"
              isRequired
              value={initialValues.lastName}
              onChange={handleInputChange}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              color="secondary"
              variant="faded"
              isRequired
              className="col-span-full"
              value={initialValues.email}
              onChange={handleInputChange}
            />
            <Input
              type="password"
              label="Contraseña"
              name="password"
              color="secondary"
              variant="faded"
              isRequired
              className="col-span-full"
              value={initialValues.password}
              onChange={handleInputChange}
            />
            <Input
              type="password"
              label="Confirmar Contraseña"
              name="confirmPassword"
              color="secondary"
              variant="faded"
              isRequired
              className="col-span-full"
              value={initialValues.confirmPassword}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              className="bg-custom-gradient-purple font-bold text-white tracking-wider mt-2 col-span-full"
            >
              Crear Cuenta
            </Button>
          </form>
        </div>
      </CardBody>
      <CardFooter className="justify-center">
        <p className="text-gray-400 font-normal text-medium">
          ¿Ya tienes una cuenta?{' '}
          <Link
            to={`/${authPaths.root}/${authPaths.signIn}`}
            className="text-purple-500 hover:text-purple-600 transition-all"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
