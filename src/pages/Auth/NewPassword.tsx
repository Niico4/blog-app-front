import Alert from '@/components/common/Alert';
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
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const NewPasswordPage = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isValidToken, setIsValidToken] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const { alert, showAlert } = useAlert();

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(
          `/users/${authPaths.root}/${authPaths.forgotPassword}/${token}`
        );
        setIsValidToken(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showAlert(error.response?.data.message, true);
        }
      }
    };

    checkToken();
  }, []);

  const validatePassword = () => {
    if (newPassword === '') {
      showAlert('La contraseña no puede estar vacía', true);
      return;
    }

    if (newPassword.length < 6) {
      showAlert('La contraseña debe tener al menos 6 caracteres', true);
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert('Las contraseñas deben ser iguales', true);
      return;
    }

    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      const url = `/users/${authPaths.root}/${authPaths.forgotPassword}/${token}`;
      await clientAxios.post(url, { password: newPassword });
      showAlert('Contraseña actualizada correctamente', false);
      setIsPasswordValid(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(
          error.response?.data.message || 'Error al cambiar la contraseña',
          true
        );
      }
    }
  };

  return (
    <Card className="max-w-lg p-10 bg-black/50 border border-purple-500/70">
      <CardHeader>
        <h2 className="text-animate text-4xl text-white font-semibold">
          {isPasswordValid
            ? 'Contraseña Actualizada'
            : isValidToken
            ? 'Crea una Nueva Contraseña'
            : 'El token no es válido'}
        </h2>
      </CardHeader>
      <CardBody>
        <p className="text-gray-400 font-normal text-medium ">
          {isPasswordValid
            ? '¡Tu contraseña se ha actualizado con éxito! Ahora puedes acceder a tu cuenta con tu nueva contraseña.'
            : isValidToken
            ? 'Para mantener tu cuenta segura, necesitamos que establezcas una nueva contraseña.'
            : 'El token no es válido, por favor, vuelve a intentarlo'}
        </p>

        <div className="w-full mx-auto">
          {alert.message && (
            <Alert
              message={alert.message}
              variant={alert.error ? Variant.ERROR : Variant.SUCCESS}
            />
          )}
          {!isPasswordValid && isValidToken && (
            <form
              className="flex flex-col gap-3 mt-5 items-end"
              onSubmit={handleSubmit}
            >
              <Input
                type="password"
                label="Nueva contraseña"
                color="secondary"
                variant="faded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                label="Confirmar contraseña"
                color="secondary"
                variant="faded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                className="bg-custom-gradient-purple font-bold text-white tracking-wider mt-2"
              >
                Cambiar Contraseña
              </Button>
            </form>
          )}
        </div>
      </CardBody>
      <CardFooter>
        {isPasswordValid && (
          <Link
            to={`/${authPaths.root}/${authPaths.signIn}`}
            className="w-full"
          >
            <Button
              type="submit"
              fullWidth
              className="bg-custom-gradient-purple font-bold text-white tracking-wider mt-2"
            >
              Inicia Sesión
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default NewPasswordPage;
