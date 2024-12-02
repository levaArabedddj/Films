import { body, param } from "express-validator";

class StaffValidator {
    constructor(
        public actorCreate = [
            body('full_name')
                .isString()
                .isLength({min: 5, max: 30})
                .withMessage('Full name must be within 5 and 30 characters'),
            body('salary_per_hour')
                .isInt({min: 0, max: 9999999})
                .withMessage('Salary per hour must be within 0 and 9999999')
                .toInt(),
            body('rating')
                .isFloat({min: 0, max: 10})
                .withMessage('Rating must be within 0 and 10')
        ],
        public crewMemberCreate = [
            body('full_name')
                .isString()
                .isLength({min: 5, max: 30})
                .withMessage('Full name must be within 5 and 30 characters'),
            body('salary_per_hour')
                .isInt({min: 0, max: 9999999})
                .withMessage('Salary per hour must be within 0 and 9999999')
                .toInt,
        ],
        public staffDelete = [
            param('id')
                .isInt({min: 0})
                .toInt()
                .withMessage('Staff id must be a positive number')
        ]
    ) {}
}

export default new StaffValidator ()