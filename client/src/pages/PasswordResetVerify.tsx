import { useFormik } from 'formik';
import { passwordResetVerify } from '../utils/validation';
import axios from '../utils/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


interface formValues {
    code: string
}

function PasswordResetVerify() {
    const navigate = useNavigate();
    const formik = useFormik<formValues>({
        initialValues: {
            code: ''
        },
        validationSchema: passwordResetVerify,
        onSubmit: () => {
            axios.post('password-reset-verify/', {
                otp: formik.values.code,
                email: localStorage.getItem('userEmail') ?? ''
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    toast.success(response.data);
                    navigate('/reset-password')
                } else if (response.status === 400) {
                    toast.error(response.data);
                }
                formik.resetForm()
            })
            .catch((error: AxiosError) => {
                toast.error(error.response?.data as string);
                formik.resetForm();
            });
        }
    })

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen  lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-x-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                    Verify
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='code' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Code</label>
                        <input type='text' name='code' id='code' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.code} ></input>
                        {formik.touched.code && formik.errors.code ? (<p className='text-red-400 text-sm'>{formik.errors.code}</p>): null }
                    </div>
                    <button type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mb-2'>Submit 
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PasswordResetVerify