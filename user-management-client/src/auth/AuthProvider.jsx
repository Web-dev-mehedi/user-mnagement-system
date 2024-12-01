import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.init';
import Swal from 'sweetalert2'



export const AuthContext = createContext({});

const AuthProvider = ({children}) => {

    const [user ,setUser] = useState(null);
// signUp with email and pass
 
const signUpWithEmailPass = (userInfo)=>{
    // 
    return createUserWithEmailAndPassword(auth , userInfo?.email, userInfo?.pass)
}

// profile
const updateUserProfile =(userInfo)=>{
    // 
    return updateProfile(auth.currentUser , { displayName : userInfo?.displayName , photoURL :userInfo?.photoURL }  )
}

// login
const userLogin =(userlogInfo)=>{
    return signInWithEmailAndPassword(auth , userlogInfo?.email, userlogInfo?.pass )
}


// GOOGLE LOGIN
const provider = new GoogleAuthProvider();
const sigInWithGoogle =()=>{
   return signInWithPopup(auth , provider)
}


// autstateChanges
useEffect(()=>{

    const unsubscribe  = onAuthStateChanged(auth, (currentUser) =>{
              
        if(currentUser){
            setUser(currentUser)  
        }
        

        return ()=> {
            unsubscribe()
        } 

    })
},[user])




const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })


const authInfo = {
    signUpWithEmailPass,
    updateUserProfile,
    userLogin,
    setUser,
    user,
    sigInWithGoogle,
    Toast


}


    // 
    return (
       <AuthContext.Provider value={authInfo}>
           {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;