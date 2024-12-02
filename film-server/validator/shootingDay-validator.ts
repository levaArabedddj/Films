import { body } from "express-validator";

class ShootingDayValidator {
    constructor(
        public create = [
            body('shooting_day')
                .isISO8601()
                .withMessage('Shooting day must be a valid date in ISO 8601 format'),
            body('shooting_time')
                .isInt({ min: 0 })
                .withMessage('Shooting time must be a non-negative integer'),
            body('shooting_location')
                .isString()
                .isLength({ min: 2, max: 100 })
                .withMessage('Shooting location must be between 2 and 100 characters long'),
            body('estimated_duration_hours')
                .isInt({ min: 1 })
                .withMessage('Estimated duration hours must be a positive integer'),
            body('filmId')
                .isInt({ min: 1 })
                .withMessage('Film ID must be a positive integer')
        ],
        public update = [
            body('shooting_day')
                .optional()
                .isISO8601()
                .withMessage('Shooting day must be a valid date in ISO 8601 format'),
            body('shooting_time')
                .optional()
                .isInt({ min: 0 })
                .withMessage('Shooting time must be a non-negative integer'),
            body('shooting_location')
                .optional()
                .isString()
                .isLength({ min: 2, max: 100 })
                .withMessage('Shooting location must be between 2 and 100 characters long'),
            body('estimated_duration_hours')
                .optional()
                .isInt({ min: 1 })
                .withMessage('Estimated duration hours must be a positive integer'),
            body('filmId')
                .optional()
                .isInt({ min: 1 })
                .withMessage('Film ID must be a positive integer')
        ]
    ) {}
}

export default new ShootingDayValidator ()