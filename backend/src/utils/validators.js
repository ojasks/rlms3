// utils/validators.js
import { body } from 'express-validator';

export const registerValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .isIn(['admin', 'grouphead', 'user'])
    .withMessage('Role must be admin, grouphead, or user'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const formSubmissionValidator = [
  body('groupName').notEmpty().withMessage('Group name is required'),
  body('formType').notEmpty().withMessage('Form type is required'),
  body('data').isArray().withMessage('Form data should be an array of objects'),
];
