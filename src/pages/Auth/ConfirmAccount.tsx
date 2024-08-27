import Alert from '@/components/common/Alert';
import clientAxios from '@/config/axios';
import { authPaths } from '@/constants/routerPaths';
import { Variant } from '@/constants/variantsAlert';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from '@nextui-org/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ConfirmAccountPage = () => {
  const [isAccountConfirmed, setIsAccountConfirmed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<{ message: string; error: boolean }>({
    message: '',
    error: false,
  });
  const [showAlert, setShowAlert] = useState<boolean>(true);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    if (!token) return;

    const confirmAccount = async () => {
      try {
        const url = `/users/${authPaths.root}/${authPaths.confirmAccount}/${token}`;

        const { data } = await clientAxios(url);

        setIsAccountConfirmed(true);

        setAlert({
          message: data.message,
          error: false,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setAlert({
            message: error.response?.data.message,
            error: true,
          });
        }
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      }
    };
    confirmAccount();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner label="Cargando datos..." color="secondary" size="lg" />
        </div>
      ) : (
        <Card className="max-w-lg p-10 bg-black/50 border border-purple-500/70">
          <CardHeader>
            <h2 className="text-animate text-4xl text-white font-semibold text-center">
              {alert.error ? '¡Error al confirmar!' : '¡Cuenta Confirmada!'}
            </h2>
          </CardHeader>
          <CardBody>
            {showAlert && (
              <Alert
                message={alert.message}
                variant={alert.error ? Variant.ERROR : Variant.SUCCESS}
              />
            )}
            <p className="text-gray-300 text-lg text-center">
              {alert.error
                ? 'Por favor revisa el enlace o contáctanos para que podamos ayudarte. ¡Estamos aquí para asistirte!'
                : '¡Gracias por confirmar tu cuenta! Ahora puedes acceder a todas las funcionalidades que tenemos para ti.'}
            </p>
          </CardBody>
          <CardFooter className="flex justify-center">
            {isAccountConfirmed && (
              <Link to={`/${authPaths.root}/${authPaths.signIn}`}>
                <Button className="bg-custom-gradient-purple font-bold text-white tracking-wider">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ConfirmAccountPage;
