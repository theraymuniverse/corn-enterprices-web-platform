import React, {useState} from 'react'
import { UserAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo2.png'
import Nav from '../Nav'

export const SignOut = () => {
    const {session, signOut} = UserAuth()
    const [loading, setLoading] = useState("");
    const navigate = useNavigate()

    const handleSignOut = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await signOut();
        navigate("/")
      }catch (err){
        console.error(err)
      }finally{
        setLoading(false)
      }
    }

  return (
    <div>
        <Nav/>
       <div className="flex min-h-full flex-1 pb-[120px] flex-col justify-center items-center px-6 py-12 lg:px-8">
               <div className="sm:mx-auto sm:w-full items-center sm:max-w-sm">
                 <img
                   alt="Your Company"
                   src={Logo} 
                   className="mx-auto h-30 w-auto"
                 />
                 <h2 className="mt-10 text-center text-[20px] md:text-[30px] font-bold tracking-tight text-gray-900">
                   Sign Out
                 </h2>
                 <button onClick={handleSignOut} className='mx-auto w-auto bg-green-500 px-[20px] md:ml-[110px]  py-[10px] text-center rounded-lg mt-[60px]  '>
                 {loading ?  "Signing out Now" : 'Click to Sign Out'}
                 </button>
               </div>
            </div>
    </div>
  )
}

export default SignOut