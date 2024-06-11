import { useFormik } from 'formik';
import { loginValidation } from '../utils/validation';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slices/userAuth';


interface formValues {
    email: string,
    password: string,
}


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik<formValues>({
        initialValues:{
            'email': '',
            'password': ''
        },
        validationSchema: loginValidation,
        onSubmit: () => {
            axios.post('/login/', {
                email: formik.values.email,
                password: formik.values.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    toast.success('Login successful');
                    navigate('/');
                    console.log(response.data)
                    dispatch(loginUser(response.data.userStatus))
                    try {
                        localStorage.setItem('userInfo', JSON.stringify(response.data));
                    }
                    catch (error) {
                        toast.error('Something went wrong')
                    }
                }
            })
            .catch((error: AxiosError) => {
                toast.error(error.response?.data as string);
            })
        }
        
    })

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen  lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-x-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                    Sign in to your account
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your email</label>
                        <input type='email' name='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='example@mail.com' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} ></input>
                        {formik.touched.email && formik.errors.email ? (<p className='text-red-400 text-sm'>{formik.errors.email}</p>): null }
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='password'>
                            Password
                        </label>
                        <input type='password' name='password' id='password' placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-600 dark:placeholder:gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}/>
                        {
                        formik.touched.password && formik.errors.password ? (<p className='text-red-400 text-sm '>{formik.errors.password}</p>): null
                        }

                    </div>
                    <button type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mb-2'>sign in
                    </button>
                    <p className='text-sm font-light text-gray-500 dark:text-gray-400'>Don't have an account
                    <Link to='/signup' className='font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1'>Sign up</Link>
                    </p>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login