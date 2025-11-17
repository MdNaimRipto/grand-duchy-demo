import express from "express";
import { BooksController } from "./books.controller";

const router = express.Router();

router.post("/uploadBook", BooksController.uploadBook);

router.get("/getAllBooks", BooksController.getAllBooks);

router.get("/getBookById/:id", BooksController.getBookById);

router.get("/getEpisodeCountById/:id", BooksController.getEpisodeCountById);

router.patch("/updateBook", BooksController.updateBook);

router.patch("/addAct/:id", BooksController.addActToBook);

router.patch("/addChapter/:id", BooksController.addChapterToAct);

router.patch("/addEpisode/:id", BooksController.addEpisodeToChapter);

router.delete("/deleteBook/:id", BooksController.deleteBook);

router.get("/getBooksTitle", BooksController.getBooksTitle);

router.get("/getLatestEpisode", BooksController.getLatestEpisode);

router.get("/getFormattedBookById/:id", BooksController.getFormattedBookById);

export const BooksRouter = router;
