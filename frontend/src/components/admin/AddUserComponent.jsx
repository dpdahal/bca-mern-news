import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '../../API';
import Swal from 'sweetalert2'


const addUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    password_confirm: yup.string().required().oneOf([yup.ref('password')], 'Password confirm must be same as password'),
    gender: yup.string().required(),
    role: yup.string().required(),

});

export default function AddUserComponent() {
    let token = localStorage.getItem("token") ?? "";
    const { register, setError, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(addUserSchema)
    });

    const addUser = (data) => {
       let formData = new FormData();
         formData.append('name', data.name);
         formData.append('email', data.email);
         formData.append('password', data.password);
         formData.append('gender',data.gender);
         formData.append('role',data.role);
         formData.append('image',data.image[0]);
        API.post('/user', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            if(res.data.status){
                Swal.fire({
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                  });
            reset();
            }else{
                console.log("data not inserted")
            }
        }).catch((error)=>{
            console.log(error);
        });
        
    }
    return (
        <div>
            <h1>Add User</h1>

            <form onSubmit={handleSubmit(addUser)}>
                <div className="form-group mb-2">
                    <label> Name:
                        <a className='text-danger'>
                            {errors.name?.message && <span>{errors.name?.message}</span>}
                        </a>
                    </label>
                    <input type="text" name='name'
                        {...register("name")}
                        className="form-control" />
                </div>
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
                    <label htmlFor="password_confirm">Password Confirm:
                    <a className='text-danger'>
                            {errors.password_confirm?.message && <span>{errors.password_confirm?.message}</span>}
                        </a>
                    </label>
                    <input type="password" name="password_confirm" {...register("password_confirm")} className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label> Gender:
                        <a className='text-danger'>
                            {errors.gender?.message && <span>{errors.gender?.message}</span>}
                        </a>
                    </label>
                    <select name='gender'  {...register("gender")} className="form-control">
                        <option value=''>Select Gender </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>

                    </select>

                </div>
                <div className="form-group mb-2">
                    <label> Gender:
                        <a className='text-danger'>
                            {errors.role?.message && <span>{errors.role?.message}</span>}
                        </a>
                    </label>
                    <select name='role'  {...register("role")} className="form-control">
                        <option value=''>Select Role </option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>

                </div>

                <div className="form-group mb-2">
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" {...register("image")} className="form-control" />

                </div>
                <div className="form-group mb-2">
                    <button className="btn btn-primary">Add User</button>
                </div>
            </form>

        </div>
    )
}
