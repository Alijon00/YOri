import { HashRouter, Route, Routes } from 'react-router-dom';
import { LangProvider } from './i18n/LangProvider';
import { Layout } from './components/Layout';
import { Home } from './screens/Home';

// Корневой компонент. LangProvider — язык интерфейса; HashRouter — маршруты
// работают на любом статическом хостинге без настройки сервера.
export function App(): React.JSX.Element {
  return (
    <LangProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </LangProvider>
  );
}
