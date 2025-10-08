import { body }  from 'express-validator';
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from '../controllers/student.Controller.js';
import { Router } from 'express';
import { authorize } from '../middleware/auth.js';



const router = Router();

// Validation rules
const studentValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  body('address').trim().isLength({ min: 5 }).withMessage('Address must be at least 5 characters'),
  body('shift').isIn(['morning', 'afternoon', 'evening', 'night']).withMessage('Invalid shift'),
  body('seatPreference').optional().isIn(['any', 'window', 'quiet', 'group'])
];

// All routes require authentication
// router.use(authenticate);

// Routes with authorization
router.get('/', authorize('students', 'read'), getStudents);
router.get('/:id', authorize('students', 'read'), getStudentById);
router.post('/', authorize('students', 'create'), studentValidation, createStudent);
router.put('/:id', authorize('students', 'update'), updateStudent);
router.delete('/:id', authorize('students', 'delete'), deleteStudent);

 export {router as studentRouter};
