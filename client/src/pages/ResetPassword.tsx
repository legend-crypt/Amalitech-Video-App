import { useFormik } from 'formik'
import { passwordReset } from '../utils/validation'
import axios from '../utils/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



interface formValues {
    password: string
    confirmPassword: string
}
function ResetPassword() {
    const navigate = useNavigate();
    const formik = useFormik<formValues>({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: passwordReset,
        onSubmit: () => {
            axios.post('password-reset/', {
                password: formik.values.password,
                confirmPassword: formik.values.confirmPassword,
                email: localStorage.getItem('userEmail') ?? ''
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    toast.success(response.data);
                    navigate('/login')
                } else if (response.status === 400) {
                    toast.success(response.data);
                }
                formik.resetForm()
            })
            .catch((error: AxiosError) => {
                toast.error(error.response?.data as string)
            });
        }
    })
  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen  lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-x-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                    Reset Password
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                        <input type='password' name='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='••••••••' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} ></input>
                        {formik.touched.password && formik.errors.password ? (<p className='text-red-400 text-sm'>{formik.errors.password}</p>): null }
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='comfirmPassword' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password</label>
                        <input type='password' name='confirmPassword' id='comfirmPassword' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='••••••••' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} ></input>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<p className='text-red-400 text-sm'>{formik.errors.confirmPassword}</p>): null }
                    </div>
                    <button type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mb-2'>Submit 
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword