import React, {createContext, useEffect, useState, useContext} from 'react'
import { supabase } from './supabaseClient'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [session,setSession] = useState(undefined)

    //Sig up 
     const signUpNewuser = async (email, password, name) => {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          name: name,
        })
        if (error) {
          console.error("Error signing up:", error.message)
        return {success:false , error}
      }
      return {success:true, data}
      }

      //sign in
        const signInUser = async (email, password) => {
          try{
            const {data, error} = await supabase.auth.signInWithPassword({ 
              email: email,
              password: password,
            })
            if(error){
              console.error('Password or email incorrect', error.message)
              return {success:false, error: error.message}
            }
            console.log('Sign-in successful:', data)
            return {success:true, data}
          } catch(error) {
            console.error('an error occured:', error)
          }
        }

          
      useEffect(() => {
          supabase.auth.getSession().then(({data:{session}}) => {
            setSession(session)
          });

          supabase.auth.onAuthStateChange((_, session) => {
            setSession(session)
          })
      },[])

        //signout
      const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.log("Error signing out:", error.message)
        } else {
          console.log("Sign out successful")
        }
      }


  return (
    <AuthContext.Provider value={{session, setSession, signUpNewuser,  signOut, signInUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}

export default AuthContextProvider