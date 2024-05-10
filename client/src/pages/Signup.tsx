import React from 'react'
import { useFormik } from 'formik'
import { signUpValidation } from '../utils/validation'

function Signup() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            sex: ''
        },
        validationSchema: signUpValidation,
        onSubmit: (values) => {
            console.log('for valuva',values)
        } 
    })
  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg:-gray-800 dark:border-x-gray-700'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Create an account
            </h1>
            <form onSubmit={formik.handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your email</label>
                    <input type='email' name='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='example@mail.com'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}/>
                    {formik.touched.email && formik.errors.email ? (<p className='text-red-400 text-sm'>{formik.errors.email}</p>): null}
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
                <div className='mb-2'>
                        <label htmlFor='password'>
                            Confirm Password
                        </label>
                        <input type='password' name='confirmPassword' id='confirmPassword' placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-600 dark:placeholder:gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}/>
                        {
                        formik.touched.confirmPassword && formik.errors.confirmPassword ? (<p className='text-red-400 text-sm '>{formik.errors.confirmPassword}</p>): null
                        }
                </div>

                <div className="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value='Male' name="sex" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                </div>
                <div className="flex items-center">
                    <input id="default-radio-2" type="radio" value='female' name="sex" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                </div>
                <button type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mb-2'>Submit</button>
            </form>
        </div>

    </div>
  )
}

export default Signup