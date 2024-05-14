import { useFormik } from 'formik';
import { passwordResetRequest } from '../utils/validation';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';


interface formValues {
    email: string
}


function PasswordResetRequest() {
    const navigate = useNavigate();
    const formik = useFormik<formValues>({
        initialValues: {
            email: ''
        },
        validationSchema: passwordResetRequest,
        onSubmit: () => {
            axios.post('password-reset-request/', {
                email: formik.values.email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    toast.success(response.data);
                    navigate('/password-reset-verify')
                    localStorage.setItem('userEmail', formik.values.email);
                } else if (response.status === 400) {
                    toast.error(response.data.error)
                }
                formik.resetForm()
            })
            .catch((error) => {
                toast.error(error.response?.data);
            });
        }
    })
  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen  lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-x-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                    Request For Password Reset
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                        <input type='text' name='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} ></input>
                        {formik.touched.email && formik.errors.email ? (<p className='text-red-400 text-sm'>{formik.errors.email}</p>): null }
                    </div>
                    <button type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mb-2'>Submit 
                    </button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default PasswordResetRequest