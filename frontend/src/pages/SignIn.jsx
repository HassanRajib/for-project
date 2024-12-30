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
            const response = await axios.post('http://localhost:3001/auth/', values)
            if(response.status === 201){
                navigate('/Login')
            }
        } catch (err) {
            console.log(err)
        }
    }


  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-orange-300 from-10% via-slate-400 via-60% to-sky-600 to-80%">
  <div className="flex shadow-2xl">
    <div className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl">
      <div className="flex flex-col text-2xl text-left gap-1">
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
                
            </form>
            <button className="px-10 py-3 text-2xl bg-gradient-to-tr from-green-400 to-purple-200 hover:from-slate-500 hover:to-yellow-200 rounded-full text-black">Signup</button>
            <div className='text-center'>
                <span>Already have an Account! </span>
                <Link to='/login' className='text-orange-600'>Login</Link>
            </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default SignIn