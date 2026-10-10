import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LangProvider } from './i18n/LangProvider';
import { Layout } from './components/Layout';
import { Home } from './screens/Home';
import { Urgent } from './screens/Urgent';
import { Situation } from './screens/Situation';
import { Call } from './screens/Call';
import { Contacts } from './screens/Contacts';
import { Report } from './screens/Report';
import { Adult } from './screens/Adult';

// Корневой компонент. LangProvider — язык интерфейса; HashRouter — маршруты
// работают на любом статическом хостинге без настройки сервера.
// Неизвестный адрес → редирект на главную.
export function App(): React.JSX.Element {
  return (
    <LangProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="urgent" element={<Urgent />} />
            <Route path="s/:id" element={<Situation />} />
            <Route path="call" element={<Call />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="report" element={<Report />} />
            <Route path="adult" element={<Adult />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </LangProvider>
  );
}
