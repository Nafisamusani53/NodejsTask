const { body, validationResult, param} = require('express-validator')

exports.loginValidator = () => {
    return [
        body('email', 'Should not be empty').notEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'The minimum password length is 8 characters').isLength({ min: 8 }),
    ]
}

exports.createUserValidator = () => {
    return [
        body('userName', 'username does not Empty').trim().notEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'password does not Empty').notEmpty(),
        body('password', 'The minimum password length is 8 characters').isLength({ min: 8 }),
        body('confirmPassword', 'confirmPassword does not Empty').notEmpty(),
        body('confirmPassword', 'The minimum password length is 8 characters').isLength({ min: 8 }),
    ]
}

exports.postValidator = () => {
    return [
        body('title', 'Should not be empty').trim().notEmpty(),
        body('body', 'Should not be empty').trim().notEmpty(),
        body('active', 'Should not be empty').notEmpty(),
        body('geolocation.latitude', 'Should not be empty').notEmpty(),
        body('geolocation.longitude', 'Should not be empty').notEmpty(),
    ]
}

exports.paramValidator = () => {
    return [
        param('id', "Id not present").notEmpty()
    ]
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};
