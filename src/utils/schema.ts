import { z } from 'zod'


export const signUpUserSchema = z.object({
    name: z.string().min(3, 'Name must be atleast 3 characters'),
    email: z.string().email('Invalid email address'),
    number: z.string().min(10, 'Invalid mobile number'),
    password: z.string().min(6, 'Password must be atleast 6 characters')
})


export const signInUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 characters')
})