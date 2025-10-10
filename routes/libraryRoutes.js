import { Router } from 'express';
import { registerLibrary } from '../controllers/library.Controller.js';
import { registerValidation } from '../middleware/validation.js';

const router = Router();

router.get("/all",)

router.post("/register",registerValidation, registerLibrary)

// router.put("/:id", updateLibrary)

// router.delete(":/id", deleteLibrary)


export { router as libraryRouter}
