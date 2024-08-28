import { z } from 'zod'


export const signUpUserSchema = z.object({
    name: z.string().min(3, 'Name must be atleast 3 characters'),
    email: z.string().email('Invalid email address'),
    mobile: z.string().min(10, 'Invalid mobile number'),
    city: z.string().min(2, 'City must be atleast 2 characters'),
    password: z.string().min(6, 'Password must be atleast 6 characters')
})


export const signInUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 characters')
})