import { Button, Input } from '@nextui-org/react';

const ChangePasswordPage = () => {
  return (
    <div>
      <h1 className="text-white text-3xl mb-5">Bienvenido a tu Perfil</h1>

      <form action="">
        <Input
          type="text"
          label="Nombre"
          name="name"
          color="default"
          variant="flat"
        />
        <Input
          type="text"
          label="Sitio Web"
          name="webSite"
          color="default"
          variant="flat"
        />
        <Input
          type="text"
          label="Teléfono"
          name="telephone"
          color="default"
          variant="flat"
        />
        <Input
          type="email"
          label="Correo Electrónico"
          name="email"
          color="default"
          variant="flat"
        />
        <Button
          type="submit"
          fullWidth
          className="bg-custom-gradient-purple font-bold text-white tracking-wider my-2"
        >
          Actualizar Datos
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
