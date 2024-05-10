import { object, ObjectSchema, string, ref } from 'yup'

interface formType {
    email: string,
    password: string,
    confirmPassword?: string
    // sex?: 'Male' | 'Female'
}
type LoginValidationSchema = Omit<formType, 'confirmPassword' | 'sex'>;

const loginValidation: ObjectSchema<LoginValidationSchema> = object({
    email: string().email('Invalid email address').required('Email is required'),
    password: string().required('Password is required'),
});


const signUpValidation: ObjectSchema<formType> = object({
    email: string().email('Invalid email address').required('Email is required'),
    password: string().required('Password is required'),
    confirmPassword: string().oneOf([ref('password')], 'Password must match'),
    // sex: string<'Male' | 'Female'>().required('Sex is required')
    
})


export { signUpValidation, loginValidation };
