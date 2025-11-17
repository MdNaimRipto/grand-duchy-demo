"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFunction = void 0;
const books_schema_1 = require("../app/modules/books/books.schema");
const updateFunction = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log({ Status: "Updating Started" });
        const allBooks = yield books_schema_1.Books.find({});
        let totalEpisodesUpdated = 0;
        for (const book of allBooks) {
            let updated = false;
            for (const act of book.acts) {
                for (const chapter of act.chapters) {
                    for (const episode of chapter.episodes) {
                        if (!episode.createdAt) {
                            episode.createdAt = new Date(); // Set only if not present
                            updated = true;
                            totalEpisodesUpdated++;
                        }
                    }
                }
            }
            if (updated) {
                yield book.save(); // Save only if anything was changed
            }
        }
        console.log({ Status: `Updated ${totalEpisodesUpdated} episodes.` });
        return {
            success: true,
            message: `createdAt added to ${totalEpisodesUpdated} episodes.`,
        };
    }
    catch (error) {
        console.error("Error updating episodes:", error);
        return {
            success: false,
            message: "Failed to update episodes.",
            error,
        };
    }
});
exports.updateFunction = updateFunction;
