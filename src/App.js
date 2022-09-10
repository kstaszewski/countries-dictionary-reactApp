import './App.css';
import {Route, Routes} from 'react-router-dom';
// PAGES:
import SearchingPage from './pages/SearchingPage/SearchingPage';
import TopBarComponent from './components/TopBarComponent/TopBarComponent';

function App () {
  return (
    <div className="App">
      <Routes>
        <Route element={<TopBarComponent />}>
          <Route index element={<SearchingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
