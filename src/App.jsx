
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { AuthProvider } from './context/auth'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Signin from './pages/Signin'
function App() {

  return (
    <>
    <AuthProvider>
    <Routes>
      <Route path='/' element={
      <PrivateRoute>
       <Home/>
      </PrivateRoute>  
      }/>
      <Route path='/signup' element={
      <PublicRoute>
      <Signup/>
      </PublicRoute>
      }/>
      <Route path='/signin' element={
    
        <Signin/>
      
      }/>
    </Routes>
    </AuthProvider>
    </>
        
  )
}

export default App
