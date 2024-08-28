import Alert from '@/components/common/Alert';
import { Variant } from '@/constants/variantsAlert';
import useAlert from '@/hooks/useAlert';
import useAuth from '@/hooks/useAuth';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

interface Props {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  webSite: string | null;
}

const UserProfilePage = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { alert, showAlert } = useAlert();
  const { auth, updateProfile } = useAuth();

  const [initialValues, setInitialValues] = useState<Props>({
    _id: auth?._id || '',
    name: auth?.name || '',
    lastName: auth?.lastName || '',
    email: auth?.email || '',
    phoneNumber: auth?.phoneNumber || '',
    webSite: auth?.webSite || '',
  });

  useEffect(() => {
    if (auth) {
      setInitialValues({
        ...auth,
      });
    }
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, lastName, email } = initialValues;
    if ([name, lastName, email].includes('')) {
      showAlert('Los campos son obligatorios', true);
      return;
    }

    await updateProfile(initialValues);
    showAlert('Guardado correctamente', false);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const chipItems = [
    {
      label: 'Nombre: ',
      value: initialValues.name,
    },
    {
      label: 'Apellido: ',
      value: initialValues.lastName,
    },
    {
      label: 'Correo electrónico: ',
      value: initialValues.email,
    },
    {
      label: 'Teléfono: ',
      value: initialValues.phoneNumber,
    },
    {
      label: 'Sitio web: ',
      value: initialValues.webSite,
    },
  ];

  return (
    <section className="p-10 overflow-auto h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-3xl mb-5">Bienvenido a tu Perfil</h1>

        <Button size="lg" variant="flat" color="warning" onPress={onOpen}>
          Edita tus datos
        </Button>
      </div>

      <Card className="max-w-[400px] my-10 ">
        <CardHeader>
          <h2 className="text-gray-300 text-2xl">Tus Datos</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-5">
            {chipItems.map(({ label, value }, index) => (
              <div className="flex gap-2" key={index}>
                <Chip color="warning" variant="flat">
                  {label}
                </Chip>
                <Chip variant="light" className="text-gray-300">
                  {value === null ? 'No definido' : value}
                </Chip>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Actualiza tus datos
          </ModalHeader>
          <ModalBody>
            {alert.message && (
              <Alert
                message={alert.message}
                variant={alert.error ? Variant.ERROR : Variant.SUCCESS}
              />
            )}
            <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
              <Input
                type="text"
                label="Nombre"
                name="name"
                color="default"
                variant="flat"
                value={initialValues.name}
                onChange={(e) =>
                  setInitialValues({ ...initialValues, name: e.target.value })
                }
              />
              <Input
                type="text"
                label="Apellido"
                name="lastName"
                color="default"
                variant="flat"
                value={initialValues.lastName}
                onChange={(e) =>
                  setInitialValues({
                    ...initialValues,
                    lastName: e.target.value,
                  })
                }
              />

              <Input
                type="text"
                label="Sitio Web"
                name="webSite"
                color="default"
                variant="flat"
                value={initialValues.webSite || ''}
                onChange={(e) =>
                  setInitialValues({
                    ...initialValues,
                    webSite: e.target.value,
                  })
                }
              />
              <Input
                type="text"
                label="Teléfono"
                name="phoneNumber"
                color="default"
                variant="flat"
                value={initialValues.phoneNumber || ''}
                onChange={(e) =>
                  setInitialValues({
                    ...initialValues,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <Input
                type="email"
                label="Correo Electrónico"
                name="email"
                color="default"
                variant="flat"
                className="col-span-full"
                value={initialValues.email}
                onChange={(e) =>
                  setInitialValues({ ...initialValues, email: e.target.value })
                }
              />

              <Button
                type="submit"
                fullWidth
                className="bg-custom-gradient-purple font-bold text-white tracking-wider my-2 col-span-full"
              >
                Actualizar Datos
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default UserProfilePage;
