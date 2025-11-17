export interface ISummary {
  _id?: string;
  bookId: string;
  characterName: string;
  actTitle: string;
  chapterTitle: string;
  episodeTitle: string;
  summary: string;
  image: string;
}

export type ISummeryFilters = {
  searchTerm?: string;
  characterName?: string;
  actTitle?: string;
  chapterTitle?: string;
  episodeTitle?: string;
  bookId?: string;
  page?: string;
  limit?: string;
};
