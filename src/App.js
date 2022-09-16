import './App.css';
import {Route, Routes} from 'react-router-dom';
// PAGES:
import SearchingPage from './pages/SearchingPage/SearchingPage';
import TopBarComponent from './components/TopBarComponent/TopBarComponent';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import Page404 from './pages/Page404/Page404';

function App () {
  return (
    <div className="App">
      <Routes>
        <Route element={<TopBarComponent />}>
          <Route index element={<SearchingPage />} />
          <Route path={`/:countryName`} element={<DetailsPage />} />

          <Route path={`/page404`} element={<Page404 />} />
          <Route path={`*`} element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
