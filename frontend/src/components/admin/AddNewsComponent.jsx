import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '../../API';
import Swal from 'sweetalert2'


const newsSchema = yup.object().shape({
    categoryId: yup.string().required(),
    title: yup.string().required(),
    slug: yup.string().required(),
    summary: yup.string().required(),
    description: yup.string().required(),

});

export default function AddNewsComponent() {
    let token = localStorage.getItem("token") ?? "";
    const { register, setError, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(newsSchema)
    });

    const addNews = (data) => {
       let formData = new FormData();
        formData.append('categoryId',data.categoryId);
        formData.append('title',data.title);
        formData.append('slug',data.slug);
        formData.append('summary',data.summary);
        formData.append('description',data.description);
         formData.append('image',data.image[0]);
        API.post('/news', formData, {
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
            <h1>Add News</h1>

            <form onSubmit={handleSubmit(addNews)}>
                <div className="form-group mb-2">
                    <label> Title:
                        <a className='text-danger'>
                            {errors.title?.message && <span>{errors.title?.message}</span>}
                        </a>
                    </label>
                    <input type="text" name='title'
                        {...register("title")}
                        className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label>Slug:
                        <a className='text-danger'>
                            {errors.slug?.message && <span>{errors.slug?.message}</span>}
                        </a>
                    </label>
                    <input type="text" name='slug'
                        {...register("slug")}
                        className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label>Summary:
                        <a className='text-danger'>
                            {errors.summary?.message && <span>{errors.summary?.message}</span>}
                        </a>
                    </label>
                    <textarea name='summary'
                        {...register("summary")}
                        className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label>Description:
                        <a className='text-danger'>
                            {errors.description?.message && <span>{errors.description?.message}</span>}
                        </a>
                    </label>
                    <textarea name='description'
                        {...register("description")}
                        className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" {...register("image")} className="form-control" />

                </div>
                <div className="form-group mb-2">
                    <button className="btn btn-primary">Add News</button>
                </div>
            </form>

        </div>
    )
}
