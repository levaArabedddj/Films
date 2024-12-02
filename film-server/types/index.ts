import { Request } from "express"

export interface CustomRequest<B> extends Request {
    body: B
}