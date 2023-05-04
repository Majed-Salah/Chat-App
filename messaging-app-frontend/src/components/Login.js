import {auth, signInWithPopup, provider} from "../firebase"
import React from 'react'
import './Login.css'

import {actionTypes} from './reducer'
import {useStateValue} from './StateProvider'

const Login = () => {

    const [{}, dispatch] = useStateValue()

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch(error => alert(error.message))
    }

    return(
        <div className='login'>
            <div className='login__container'>
                <img src="logo512.png" alt="whatsapp" />
                <div className='login__text'>
                    <h1>Sign in to Messaging App</h1>
                </div>
                <button onClick={signIn}>Sign in with Google</button>
            </div>
        </div>
    )
}

export default Login