import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '../../API';

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export default function LoginComponent() {
    const {register,setError, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(loginSchema)
    });

    const login=(data)=>{
        API.post('/login', data).then((response)=>{
            if(response.data.emalError){
                setError('email', {
                    type: "manual",
                    message: response.data.emalError
                });
            }else if(response.data.passwordError){
                setError('password', {
                    type: "manual",
                    message: response.data.passwordError
                });
            }else{
                let token = response.data.token;
                localStorage.setItem('token', token);
                window.location.href = '/admin';
            }
        }).catch((error)=>{
            console.log(error);
        });
    }
    return (
        <div className='container mt-5'>
            <h1>Login To Dashboard</h1>
            <form onSubmit={handleSubmit(login)}>
                <div className="form-group mb-2">
                    <label>Email address:
                        <a className='text-danger'>
                        {errors.email?.message && <span>{errors.email?.message}</span>}
                        </a>
                    </label>
                    <input type="email" name='email'
                     {...register("email")} 
                    className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label>Password:
                    <a className='text-danger'>
                        {errors.password?.message && <span>{errors.password?.message}</span>}
                        </a>
                    </label>
                    <input type="password" name='password'
                     {...register("password")} 
                    className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    )
}
