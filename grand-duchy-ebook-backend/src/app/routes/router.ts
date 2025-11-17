import express from "express";
import { UserRouter } from "../modules/users/users.router";
import { BooksRouter } from "../modules/books/books.router";
import { SummaryRouter } from "../modules/summary/summary.router";
import { ReadListRouter } from "../modules/readlist/readlist.router";
import { QuoteRouter } from "../modules/quote/quote.router";
import { CharacterRouter } from "../modules/character/character.router";
import { TimerRouter } from "../modules/timer/timer.router";
import { NoteRouter } from "../modules/notes/notes.router";

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/books",
    route: BooksRouter,
  },
  {
    path: "/summary",
    route: SummaryRouter,
  },
  {
    path: "/readList",
    route: ReadListRouter,
  },
  {
    path: "/quotes",
    route: QuoteRouter,
  },
  {
    path: "/notes",
    route: NoteRouter,
  },
  {
    path: "/character",
    route: CharacterRouter,
  },
  {
    path: "/timer",
    route: TimerRouter,
  },
];

routes.map(r => router.use(r.path, r.route));

export const Routers = router;
