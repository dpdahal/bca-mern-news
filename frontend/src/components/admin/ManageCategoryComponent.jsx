import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '../../API';
import Swal from 'sweetalert2';

const categorySchema = yup.object().shape({
    category_name: yup.string().required(),
});

export default function ManageCategoryComponent() {
    let token = localStorage.getItem("token") ?? "";
    const { register, setError, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(categorySchema)
    });
    const addCategory = (data) => {
        API.post("/category", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        });

    }
  return (
    <div className='mt-3'>
        <h1>Manage Category</h1>
         <form onSubmit={handleSubmit(addCategory)}>
                <div className="form-group mb-2">
                    <label> Name:
                        <a className='text-danger'>
                            {errors.category_name?.message && <span>{errors.category_name?.message}</span>}
                        </a>
                    </label>
                    <input type="text" name='category_name'
                        {...register("category_name")}
                        className="form-control" />
                </div>               
                <div className="form-group mb-2">
                    <button className="btn btn-primary">Add Category</button>
                </div>
            </form>
    </div>
  )
}
