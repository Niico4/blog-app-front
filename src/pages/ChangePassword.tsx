import Alert from '@/components/common/Alert';
import { Variant } from '@/constants/variantsAlert';
import useAlert from '@/hooks/useAlert';
import useAuth from '@/hooks/useAuth';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  currentPassword: string;
  newPassword: string;
}

const ChangePasswordPage = () => {
  const [initialValues, setInitialValues] = useState<Props>({
    currentPassword: '',
    newPassword: '',
  });
  const { alert, showAlert } = useAlert();
  const { saveNewPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    showAlert('', false);

    if (Object.values(initialValues).some((value) => value === '')) {
      showAlert('Todos los campos son obligatorios', true);
      return;
    }

    if (initialValues.newPassword.length < 6) {
      showAlert('La contraseña debe tener al menos 6 caracteres', true);
    }

    const res = await saveNewPassword(initialValues);
    return res;
  };
  return (
    <section className="p-10 overflow-auto h-screen grid place-content-center">
      <Card className="w-[450px]">
        <CardHeader className="flex items-center justify-center my-5">
          <h1 className="text-white text-3xl">Actualiza tu contraseña</h1>
        </CardHeader>
        <CardBody className="p-5">
          {alert.message && (
            <Alert
              message={alert.message}
              variant={alert.error ? Variant.ERROR : Variant.SUCCESS}
            />
          )}
          <form
            className="flex flex-col gap-5 items-center justify-center"
            onSubmit={handleSubmit}
          >
            <Input
              type="password"
              label="Contraseña Actual"
              name="currentPassword"
              color="default"
              variant="flat"
              onChange={(e) =>
                setInitialValues({
                  ...initialValues,
                  currentPassword: e.target.value,
                })
              }
            />

            <Input
              type="password"
              label="Contraseña Nueva"
              name="newPassword"
              color="default"
              variant="flat"
              onChange={(e) =>
                setInitialValues({
                  ...initialValues,
                  newPassword: e.target.value,
                })
              }
            />

            <Button
              type="submit"
              fullWidth
              className="bg-custom-gradient-purple font-bold text-white tracking-wider my-2 col-span-full"
            >
              Actualizar Contraseña
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
};

export default ChangePasswordPage;
