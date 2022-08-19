import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { components } from '@/routes';
import css from './App.module.scss';

export const App = (): JSX.Element => (
   <div className={css.app}>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Sidebar />}>
               <Route index={true} element={<div>Under Construction</div>} />
               {components.map((component) => (
                  <Route
                     key={component.name}
                     path={`/${component.name}`}
                     element={component.display}
                  />
               ))}
               <Route path="*" element={<div>404</div>} />
            </Route>
         </Routes>
      </BrowserRouter>
   </div>
);
