
import './App.css'
import LoginPage from './Pages/LoginPage';
import Searchclinic from './components/Searchclinic'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path={'/'} element={<Searchclinic/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
