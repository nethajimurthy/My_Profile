import './App.css';
import LoginPage from './components/LoginPage';
import Register from './components/Register';
import MyProfile from './components/MyProfile';
import EditProfile from './components/EditProfile'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <div className='Header'>
        <h3>My Profile</h3>
      </div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='myprofile' element={<MyProfile/>}/>
          <Route path='editprofile' element={<EditProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
