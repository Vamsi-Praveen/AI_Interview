import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loading from './components/Loader'
import { Toaster } from './components/ui/toaster'
import Interview from './pages/Interview'
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Error404 = lazy(() => import('./pages/404'))
const Home = lazy(() => import('./pages/Home'))
const PrivateRoute = lazy(() => import('./components/ui/Auth/PrivateRoute'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Verify = lazy(() => import('./pages/Verify'))
const Interview_Onboard = lazy(() => import('./pages/Interview_Onboard'))

const App = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route index element={<Dashboard />} />
              <Route path='/dashboard/interview_onboard/:id' element={<Interview_Onboard />} />
              <Route path='/dashboard/interview-take/:id' element={<Interview />} />
            </Route>
            <Route path='/' element={<Home />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/forgot-password' element={<ForgotPassword />} />
            <Route path='/auth/verify/:token' element={<Verify />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </Suspense>
    </>
  )
}

export default App