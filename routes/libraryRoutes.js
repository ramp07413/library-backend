import { Router } from 'express';
import { registerLibrary } from '../controllers/library.Controller.js';

const router = Router();

// router.get("/all", allLibraries)

router.post("/register", registerLibrary)

// router.put("/:id", updateLibrary)

// router.delete(":/id", deleteLibrary)


export { router as libraryRouter}
