import React from 'react';
import { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        setEmail('');
        setPassword('');
    }

    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='border-2 border-emerald-600 p-20 rounded-xl'>
                <form onSubmit={(e) => {
                    submitHandler(e)
                }} className='flex flex-col items-center justify-center'>
                    <input 
                        required 
                        className='  bg-transparent border-2 border-emerald-600 py-3 px-5 text-xl rounded-full placeholder:text-white' 
                        type="email" 
                        placeholder='Enter your E-Mail' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        required 
                        className='  bg-transparent border-2 border-emerald-600 py-3 px-5 text-xl rounded-full mt-3 placeholder:text-white' 
                        type="password" 
                        placeholder='Enter your Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className=' bg-emerald-600 text-white mt-5 border-2 border-emerald-600 py-3 px-5 text-xl rounded-full placeholder:text-white' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;