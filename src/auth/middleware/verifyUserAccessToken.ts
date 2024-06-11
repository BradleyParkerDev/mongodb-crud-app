import { Response, Request, NextFunction } from "express"

const verifyUserAccessToken = async (req:Request,res:Response, next:NextFunction) => {
    console.log('Middleware!')
    next()

}

export default verifyUserAccessToken;