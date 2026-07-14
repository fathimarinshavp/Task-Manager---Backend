import jwt from 'jsonwebtoken'

export default async function auth(req,res,next) {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).send({msg:"token missing"})
        }
        const token = authHeader.split(" ")[1]
        const decode = await jwt.verify(
            token,
            process.env.JWT_KEY
        )
        req.user = decode
        next()
    } catch (error) {
        return res.status(403).send({msg:"invalid input"})
    }
}