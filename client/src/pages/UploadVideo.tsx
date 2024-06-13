import { useFormik } from 'formik';
import { VideoValidation } from '../utils/validation';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';


interface formValues {
    title: string
    description: string
    thumbnail: null
    video: null
}

function UploadVideo() {
    const formik = useFormik<formValues>({
        initialValues: {
            'title': '',
            'description': '',
            'thumbnail': null,
            'video': null
        },
        validationSchema: VideoValidation,
        onSubmit: () => {            axios.post('videos/', {
                title: formik.values.title,
                description: formik.values.description,
                thumbnail: formik.values.thumbnail,
                video: formik.values.video
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                toast.success('Video uploaded Successfully');
                formik.resetForm();
            })
            .catch((error: any) => {
                console.log(error.response?.data)
                toast.error('Something wrong occured', error.response?.data)
            })
        }
    })

    const hanldeFileUpload = (fieldName: string, e: React.ChangeEvent<HTMLInputElement> | null) =>  {
        const selectedFile = e?.currentTarget.files ? e.currentTarget.files[0] : null;
        formik.setFieldValue(fieldName, selectedFile)
    }

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen  lg:py-0'>
    <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-x-gray-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Upload A Video
            </h1>
            <form onSubmit={formik.handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your title</label>
                    <input type='text' name='title' id='title' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='example@mail.com' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} />
                    {formik.touched.title && formik.errors.title ? (<p className='text-red-400 text-sm'>{formik.errors.title}</p>): null }
                </div>
                <div className='mb-2'>
                    <label htmlFor='description'>
                        description
                    </label>
                    <textarea
                    rows={4}
                    name='description' id='description' placeholder='Video Description' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}/>
                    {
                    formik.touched.description && formik.errors.description ? (<p className='text-red-400 text-sm '>{formik.errors.description}</p>): null
                    }

                </div>
                <div className='mb-2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="thumnail">Upload thumbnail</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    name='thumbnail'
                    onChange={(e) => hanldeFileUpload('thumbnail', e)}
                    aria-describedby="thumnail_help" id="thumbnail" type="file" />
                </div>
                <div className='mb-2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="video">Upload Video</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    name='video'
                    onChange={(e) => hanldeFileUpload('video', e)}
                    aria-describedby="video_help" id="video" type="file" />
                    {formik.touched.video && formik.errors.video ? (<p className='text-red-400 text-sm'>{formik.errors.video}</p>): null }

                </div>
                <button disabled={formik.isSubmitting} type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mb-2'>{formik.isSubmitting ? 'Uploading...': 'Upload'}
                </button>
            </form>
        </div>
    </div>

</div>
  )
}

export default UploadVideo