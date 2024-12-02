import { body, param, query } from "express-validator";

class FilmsValidator {
    constructor(
        public create = [
            body('title')
                .isString()
                .isLength({min: 2, max: 20})
                .withMessage('Film title must be within 2 and 20 characters long'),
            body('description')
                .isString()
                .isLength({max: 500})
                .withMessage('Film description must be less than 500 character'),
            body('genre')
                .isString()
                .isLength({min: 3, max: 15})
                .withMessage('Genre must be within 3 adn 15 character')                

        ],
        public getOne = [
            param('id')
                .isInt({min: 1})
                .toInt()
                .withMessage('User ID must be a positive integer')
        ],
        public getManyPagination = [
            query('page')
                .isInt({min: 1})
                .toInt()
                .withMessage('Page number must be a number'),
            query('pageSize')
                .isInt({min: 3, max: 15})
                .toInt()
                .withMessage('PageSize must be a number and within 2 and 15')
        ],
        public update = [
            param('id')
                .isInt({min: 1})
                .toInt()
                .withMessage('Film id must be a positive integer'),
            body('title')
                .optional()
                .isLength({min: 2, max: 20})
                .withMessage('Film title must be within 2 and 20 characters long'),
            body('description')
                .optional()
                .isString()
                .isLength({max: 500})
                .withMessage('Film description must be less than 500 character'),
            body('genre')
                .optional()
                .isString()
                .isLength({min: 3, max: 15})
                .withMessage('Genre must be within 3 adn 15 character')                
        ],
    ){}
}

export default  new FilmsValidator()