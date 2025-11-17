import { Books } from "../app/modules/books/books.schema";

export const updateFunction = async () => {
  try {
    console.log({ Status: "Updating Started" });

    const allBooks = await Books.find({});

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
        await book.save(); // Save only if anything was changed
      }
    }

    console.log({ Status: `Updated ${totalEpisodesUpdated} episodes.` });

    return {
      success: true,
      message: `createdAt added to ${totalEpisodesUpdated} episodes.`,
    };
  } catch (error) {
    console.error("Error updating episodes:", error);
    return {
      success: false,
      message: "Failed to update episodes.",
      error,
    };
  }
};
