"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
const express_1 = __importDefault(require("express"));
const users_router_1 = require("../modules/users/users.router");
const books_router_1 = require("../modules/books/books.router");
const summary_router_1 = require("../modules/summary/summary.router");
const readlist_router_1 = require("../modules/readlist/readlist.router");
const quote_router_1 = require("../modules/quote/quote.router");
const character_router_1 = require("../modules/character/character.router");
const timer_router_1 = require("../modules/timer/timer.router");
const notes_router_1 = require("../modules/notes/notes.router");
const router = express_1.default.Router();
const routes = [
    {
        path: "/users",
        route: users_router_1.UserRouter,
    },
    {
        path: "/books",
        route: books_router_1.BooksRouter,
    },
    {
        path: "/summary",
        route: summary_router_1.SummaryRouter,
    },
    {
        path: "/readList",
        route: readlist_router_1.ReadListRouter,
    },
    {
        path: "/quotes",
        route: quote_router_1.QuoteRouter,
    },
    {
        path: "/notes",
        route: notes_router_1.NoteRouter,
    },
    {
        path: "/character",
        route: character_router_1.CharacterRouter,
    },
    {
        path: "/timer",
        route: timer_router_1.TimerRouter,
    },
];
routes.map(r => router.use(r.path, r.route));
exports.Routers = router;
