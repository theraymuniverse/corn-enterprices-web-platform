import React, {useState} from 'react'
import Logo from '../assets/Logo2.png'
import Nav from '../Nav'
import { UserAuth } from './AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  
  const { session, signUpNewuser ,signInUser} = UserAuth();
  const navigate = useNavigate()
  console.log(session)
   
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser(email, password)
      if (result.success) {
        navigate("/products")
        } else {
          setError('Email or Password Incorrect')
        }
    } catch (err) {
      setError('an error occurred: ${err.message || err}')
    } finally {
      setLoading(false);
    }
  }

  const handleToggle = () => {
    if (type==='password'){
       setIcon(Eye);
       setType('text')
    } else {
       setIcon(EyeyeOff)
       setType('password')
    }
 }
  return (
    <div>
    <Nav/>
      <div className="flex min-h-full flex-1 pb-[120px] flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={Logo} 
            className="mx-auto h-30 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignIn} method="GET" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <Link to="/register" className="font-semibold text-green-600 hover:text-green-900">
              Register Now.
            </Link>
          </p>
        </div>
      </div>
 </div>
  )
}

export default Login