import  jwt  from 'jsonwebtoken';
class TokenService {
    generate(payload: any) {
        const token = jwt.sign(
            {payload},
            process.env.JWT_SECRET!,
            {expiresIn: process.env.JWT_EXPIRES!} 
        )
        return token
    }
    validate(token: string) {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET!, {ignoreExpiration: false})
            return data 
        } catch (e) {
            return null
        }
    }
}

export default new TokenService()