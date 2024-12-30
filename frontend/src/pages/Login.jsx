import axios from 'axios';
import { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChanges = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:3001/auth/Login', values)
            if (response.status === 201){
                localStorage.setItem('token', response.data.token)
                navigate('/Home')
            }
        }catch (err){
            console.log(err.response ? err.response.data.message : "no account found")
        }
    }
  return (
    <div className='flex justify-center items-center h-screen'>
    <div className='shadow-lg px-8 py-5 border w-90'>
        <h2 className='text-lg font-bold mb-4'>LogIn</h2>
        <form onSubmit={handleSubmit}>
          
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
            <span> dont have an Account! </span>
            <Link to='/' className='text-orange-600'>SignUp</Link>
        </div>
    </div>
</div>
  )
}

export default Login