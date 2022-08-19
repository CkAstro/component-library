import { NavLink, Outlet } from 'react-router-dom';
import { components } from '@/routes';
import css from './Sidebar.module.scss';

export const Sidebar = (): JSX.Element => {
   const links = components.map((component) => (
      <NavLink
         key={component.name}
         to={component.name}
         className={({ isActive }: { isActive: boolean }): string =>
            `${css.sidebar__link} ${isActive ? css.active : ''}`
         }
      >
         &lt;{component.name} /&gt;
      </NavLink>
   ));

   return (
      <>
         <div className={css.sidebar}>
            <div className={css.sidebar__header}>Components</div>
            {links}
         </div>
         <div>
            <Outlet />
         </div>
      </>
   );
};
