import { body, param } from "express-validator";

class AuthValidator {
    constructor(
        public registration = [
            body('name')
                .isString()
                .isLength({min: 2, max: 10})
                .withMessage('Name must be within 2 and 10 characters long'),
            body('surname')
                .isString()
                .isLength({min: 2, max: 20})
                .withMessage('Surname must be within 2 and 20 characters long'),
            body('email')
                .isEmail()
                .withMessage('Please enter a valid email address'),
            body('password')
                .isLength({min: 4, max: 12})
                .withMessage('Password must be within 4 and 12 characters long')
        ],
        public login = [
            body('email')
                .isEmail()
                .withMessage('Please enter a valid email address'),
            body('password')
                .isLength({min: 4, max: 12})
                .withMessage('Password must be within 4 and 12 characters long')
        ],
    ){}
}

export default new AuthValidator()