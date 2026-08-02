import express from "express";

// lib
import { asyncRequestHandler } from "../../lib/asyncRequestHandler.js";
import { prisma } from "../../lib/prisma.js";
import {
  BadRequestException,
  UnauthorizedException,
} from "../../config/http-exception.js";

const createNote = async (req: express.Request, res: express.Response) => {
  const { title } = req.body;

  const newNote = await prisma.note.create({
    data: {
      title,
      userId: req.user.id,
    },
  });

  return {
    msg: "Note created successfully",
    data: newNote,
  };
};

const updateNote = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!id || typeof id !== "string") {
    throw new BadRequestException("Note ID is required.");
  }

  const updatedNote = await prisma.note.update({
    where: {
      id,
      userId: req.user.id,
    },
    data: {
      title,
      content,
    },
  });

  return {
    msg: "Note updated successfully.",
    data: updatedNote
  };
};

const deleteNote = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    throw new BadRequestException("Invalid note ID");
  }

  await prisma.note.delete({
    where: {
      id,
      userId: req.user.id,
    },
  });

  return {
    msg: "Note deleted successfully.",
  };
};

const getAllNotes = async (req: express.Request, res: express.Response) => {
  const allNotes = await prisma.note.findMany({
    where: {
      userId: req.user.id,
    },
  });

  return {
    msg: "All notes fetched successfully.",
    data: allNotes,
  };
};

const getNoteById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    throw new BadRequestException("Note ID is required.");
  }

  const note = await prisma.note.findUnique({
    where: {
      id,
      userId: req.user.id,
    },
  });

  return {
    msg: note ? "Note fetched successfully." : "No note available.",
    data: note ? note : {},
  };
};

export const CreateNote = asyncRequestHandler(createNote);
export const UpdateNote = asyncRequestHandler(updateNote);
export const DeleteNote = asyncRequestHandler(deleteNote);
export const GetAllNotes = asyncRequestHandler(getAllNotes);
export const GetNoteById = asyncRequestHandler(getNoteById);
