import { body, param } from "express-validator";

class FinanceValidator {
    constructor(
        public create = [
            param('id')
                .isInt({min: 1})
                .toInt(),
            body('budget')
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Budget must be a positive number'),
            body('actor_salary')
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Actor salary must be a positive number'),
            body('crew_salary')
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Crew salary must be a positive number'),
            body('advertising_cost')
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Advertising cost must be a positive number'),
            body('editing_cost')
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Editing cost must be a positive number'),
            body('equipment_cost')
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Equipment cost must be a positive number')
        ],
        public update = [
            param('id')
                .isInt({min: 1})
                .toInt(),
            body('budget')
                .optional()
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Budget must be a positive number'),
            body('actor_salary')
                .optional()
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Actor salary must be a positive number'),
            body('crew_salary')
                .optional()
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Crew salary must be a positive number'),
            body('advertising_cost')
                .optional()
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Advertising cost must be a positive number'),
            body('editing_cost')
                .optional()
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Editing cost must be a positive number'),
            body('equipment_cost')
                .optional()
                .isNumeric()
                .isFloat({ min: 0 })
                .withMessage('Equipment cost must be a positive number')
        ]
    ){

    }    

}

export default new FinanceValidator ()