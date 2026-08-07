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

router.post("/", validateSchema({ body: createNoteSchema }), CreateNote);
router.put("/:id", validateSchema({ body: updateNoteSchema }), UpdateNote);
router.delete("/:id", DeleteNote);
router.get("/all", GetAllNotes);
router.get("/:id", GetNoteById);

export default router;
