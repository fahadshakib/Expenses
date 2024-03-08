import {Routes , Route } from 'react-router-dom';
import { useUserContext } from './context/user.context';
import Navigation from './components/navigation/navigation.component';
import Home from "./routes/home/home.component";
import Registration from "./routes/registration/registration.component";
import SignIn from "./routes/signin/signin.component";
import Profile from './routes/profile/profile.component';
import PageNotFound from './routes/route-error/route-error.component';




function App() {

  const {user} = useUserContext();
 
  return (
      <Routes>
       <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>} />
          <Route path='/registration' element={<Registration/>} />
          <Route  path='/sign-in' element={<SignIn/>} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
  )
}

export default App
