import { NavLink } from 'react-router-dom';

interface NavItemProps {
  path: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ path, icon, label }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `${
            isActive ? 'text-[#A604F2]' : 'text-gray-300'
          } flex gap-2 items-center my-4`
        }
        unstable_viewTransition
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
