import { userPaths } from '@/constants/routerPaths';
import useAuth from '@/hooks/useAuth';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import {
  IconArrowBarToLeft,
  IconArticle,
  IconBrandTinder,
  IconBrightnessDown,
  IconHome,
  IconLogout,
  IconMessage,
  IconSelector,
  IconSettings,
  IconUserCircle,
  IconUsersGroup,
} from '@tabler/icons-react';
import NavItem from './NavItems';
import { Fragment } from 'react';

const Sidebar = () => {
  const { auth, signOut } = useAuth();

  const navItems = [
    {
      label: 'Inicio',
      icon: <IconHome stroke={1.5} />,
      path: userPaths.home,
    },
    {
      label: 'Blog',
      icon: <IconArticle stroke={1.5} />,
      path: userPaths.blog,
    },
    {
      label: 'Sobre Nosotros',
      icon: <IconUsersGroup stroke={1.5} />,
      path: userPaths.aboutUs,
    },
    {
      label: 'Testimonios',
      icon: <IconMessage stroke={1.5} />,
      path: userPaths.testimonials,
    },
    {
      label: 'Novedades',
      icon: <IconBrandTinder stroke={1.5} />,
      path: userPaths.updates,
    },
    {
      label: 'Configuración',
      icon: <IconSettings stroke={1.5} />,
      path: userPaths.settings,
    },
  ];

  return (
    <aside className="w-full h-full bg-black rounded-md px-8 py-10 flex flex-col justify-between">
      <section className="flex justify-between items-center">
        {/* //TODO:Logo del blog */}
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          size="lg"
        />
        <article className="flex items-center justify-center gap-2">
          <Button isIconOnly color="default" aria-label="light mode" size="sm">
            <IconBrightnessDown stroke={1.5} />
          </Button>
          <Button isIconOnly color="default" aria-label="Collapsed" size="sm">
            <IconArrowBarToLeft stroke={1.5} />
          </Button>
        </article>
      </section>
      <section>
        <nav className="text-white">
          <ul>
            {navItems.map(({ icon, label, path }, index) => (
              <Fragment key={path}>
                <NavItem
                  path={`/${userPaths.root}/${path}`}
                  icon={icon}
                  label={label}
                />
                {index === 3 && <Divider className="my-4 bg-[#222222]" />}
              </Fragment>
            ))}
          </ul>
        </nav>
      </section>
      <section>
        <Dropdown>
          <Card className="w-full mt-10 border border-[#333333]">
            <CardBody className="flex-row items-center justify-between">
              <div className="flex justify-center items-center gap-3">
                {auth?.name ? (
                  <Avatar
                    showFallback
                    isBordered
                    className="text-lg"
                    name={auth?.name[0]}
                  />
                ) : (
                  <Avatar
                    showFallback
                    isBordered
                    src="https://images.unsplash.com/broken"
                  />
                )}
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {auth?.name} {auth?.lastName}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    {auth?.email}
                  </h5>
                </div>
              </div>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="ghost">
                  <IconSelector stroke={1.5} />
                </Button>
              </DropdownTrigger>
            </CardBody>
          </Card>

          <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
            <DropdownItem
              key="profile"
              startContent={<IconUserCircle stroke={1.5} />}
            >
              Perfil
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              startContent={<IconLogout stroke={1.5} />}
              onClick={signOut}
            >
              Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </section>
    </aside>
  );
};

export default Sidebar;
