import axios from 'axios';
import { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate();
    const handleChanges = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post()
            if(response.status === 201){
                navigate()
            }
        } catch (err) {
            console.log(err)
        }
    }


  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='shadow-lg px-8 py-5 border w-90'>
            <h2 className='text-lg font-bold mb-4'>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='username' className='block text-gray-700'>Username</label>
                    <input type="text" placeholder='your name' className='w-full px-3 py-2 border'
                    name='username' onChange={handleChanges}/>
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-gray-700'>Email</label>
                    <input type="email" placeholder='your email' className='w-full px-3 py-2 border'
                    name='email' onChange={handleChanges}/>
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-gray-700'>Password</label>
                    <input type="password" placeholder='password' className='w-full px-3 py-2 border'
                    name='password' onChange={handleChanges}/>
                </div>
                <button className='w-full bg-sky-600 text-black py-2'>Submit</button>
            </form>
            <div className='text-center'>
                <span>Already have an Account! </span>
                <Link to='/login' className='text-orange-600'>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default SignIn