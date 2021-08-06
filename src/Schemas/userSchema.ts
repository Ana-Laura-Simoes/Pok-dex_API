import joi from 'joi';

const signUpSchema = joi.object({    
    email: joi.string().email().required(),
    password: joi.string().min(1).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
});

export {signUpSchema};