import AppProvider from './context/AppProvider';
import MainRouter from './routes/MainRouter';

function App() {
  return (
    <AppProvider>
      <MainRouter></MainRouter>
    </AppProvider>
  );
}

export default App;
