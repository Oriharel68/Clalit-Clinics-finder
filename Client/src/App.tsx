
import './App.css'
import LoginPage from './Pages/LoginPage';
import Searchclinic from './components/Searchclinic'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import AdminPage from './Pages/AdminPage';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path={'/'} element={<Searchclinic/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/AdminPanel'} element={<AdminPage/>}/>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
