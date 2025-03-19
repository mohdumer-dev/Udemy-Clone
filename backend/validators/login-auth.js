import {z} from 'zod'

const LoginAuthenication = z.object({
    email:z.string().email().min(8).max(50),
    password:z.string().min(5).max(24).trim()
})

export default LoginAuthenication