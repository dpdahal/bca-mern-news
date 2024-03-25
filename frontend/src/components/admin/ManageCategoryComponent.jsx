import React,{useEffect,useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '../../API';
import Swal from 'sweetalert2';

const categorySchema = yup.object().shape({
    category_name: yup.string().required(),
});

export default function ManageCategoryComponent() {
    const [categories, setCategories] = useState([]);
    const [loading , setLoading] = useState(true);
    let token = localStorage.getItem("token") ?? "";
    const [btnName, setBtnName] = useState("Add Category");
    const [criteria, setCriteria] = useState("");
    const { register, setError, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(categorySchema)
    });
    const addCategory = (data) => {
        if(criteria){
            API.put(`/category/${criteria}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log(response)
                setCriteria("");
                setBtnName("Add Category");
                getCategory();
                reset();
               
            }).catch(error => {
                console.log(error)
            });

        }else{
        API.post("/category", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response)
            getCategory();
            reset();
        }).catch(error => {
            console.log(error)
        });
        }

    }

    const getCategory = () => { 
        API.get("/category", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setCategories(response.data);
            setLoading(false);
        }).catch(error => {
            console.log(error)
        });
    }

    const updateData = (id) => {
        API.get(`/category/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            reset(response.data);
            setCriteria(response.data._id);
            setBtnName("Update Category");          
        
        }).catch(error => {
            console.log(error)
        });
    }


    useEffect(() => {
        getCategory();
    },[]);

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
                    <button className="btn btn-primary">{btnName}</button>
                </div>
            </form>
        <hr />
        <h1>Category List</h1>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {loading && <tr><td colSpan="2">Loading...</td></tr>}
                {categories.map((category,index) => (
                    <tr key={index}>
                        <td>{category.category_name}</td>
                        <td width='15%'>
                            <button className="btn btn-danger">Delete</button>
                            <button onClick={()=>updateData(category._id)} className='btn btn-primary'>Update</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
