import { object, string, ref, mixed} from 'yup'

// type LoginValidationSchema = Omit<formType, 'confirmPassword' | 'sex'>;

const loginValidation = object({
    email: string().email('Invalid email address').required('Email is required'),
    password: string().required('Password is required'),
});


const signUpValidation = object({
    email: string().email('Invalid email address').required('Email is required'),
    password: string().required('Password is required'),
    confirmPassword: string().oneOf([ref('password')], 'Password must match'),
    sex: string<'Male' | 'Female'>().required('Sex is required')
    
})

const verificationValidation = object({
    code: string().matches(/^[0-9]{4}$/, 'Must be exactly 4 digits').required('Please input your code')
})

const requestVerificationValidation = object({
    email: string().email('Invalid email').required('Email is required')
})

const passwordReset = object({
    password: string().required('Password is required'),
    confirmPassword: string().oneOf([ref('password')], 'Password must match').required('This field is required')
})

const passwordResetVerify = object({
    code: string().matches(/^[0-9]{4}$/, 'Must be exactly 4 digits').required("Please input your code")
})

const passwordResetRequest = object({
    email: string().email('Input a valid email').required('Email is required')
})


const VideoValidation = object({
    title: string().required('Input a title for the video'),
    description: string(),
    thumbnail: mixed(),
    video: mixed().required('Upload a video')
})

export { signUpValidation, loginValidation, verificationValidation, requestVerificationValidation, passwordReset, passwordResetRequest, passwordResetVerify, VideoValidation};
