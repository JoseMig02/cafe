import {Request,Response,NextFunction} from 'express'
import  jwt  from 'jsonwebtoken';

const validateToken = (req:Request,res:Response,next:NextFunction)=>{
  
    const headertoken = req.headers['authorization']

    if(headertoken != undefined && headertoken.startsWith('Bearer')){
        //tiene token
        try {
            const bearerToken = headertoken.slice(7)
            jwt.verify(bearerToken , process.env.SECRET_KEY || 'pepito123')
            next()
            
        } catch (error) {
            res.status(401).json({
                msg:'Token no valido'
            })            
        }
       
    }else{
        res.status(401).json({
            msg:'Acceso denegado'
        })
    }
    

}
export default validateToken