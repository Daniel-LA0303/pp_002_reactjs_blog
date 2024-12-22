
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routers/Routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;