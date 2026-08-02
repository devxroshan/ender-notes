import express from "express";

// controller
import {
  CreateNote,
  UpdateNote,
  DeleteNote,
  GetAllNotes,
  GetNoteById,
} from "./note.controller.js";
import { validateSchema } from "../../middlewares/validate-schema.js";
import { createNoteSchema } from "./schema/createNote.schema.js";
import { isLoggedIn } from "../../middlewares/is-logged-in.js";
import { updateNoteSchema } from "./schema/updateNote.schema.js";

const router = express.Router();

router.post("/", isLoggedIn, validateSchema({ body: createNoteSchema }), CreateNote);
router.put("/:id", isLoggedIn,validateSchema({ body: updateNoteSchema }), UpdateNote);
router.delete("/:id", isLoggedIn, DeleteNote);
router.get("/all", isLoggedIn, GetAllNotes);
router.get("/:id", isLoggedIn,GetNoteById);

export default router;
