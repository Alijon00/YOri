import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './screens/Home';

// Корневой компонент. HashRouter — чтобы маршруты работали
// на любом статическом хостинге без настройки сервера.
export function App(): React.JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
