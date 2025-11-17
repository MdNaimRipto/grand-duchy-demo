export interface IEpisode {
  title: string;
  content: string;
}

export interface IChapter {
  title: string;
  episodes: Array<IEpisode>;
}

export interface IAct {
  title: string;
  chapters: Array<IChapter>;
}

export interface IBooks {
  _id?: string;
  title: string;
  prologue: string;
  image: string;
  acts: Array<IAct>;
}

export interface IUpdateBook {
  bookId: string;
  actIndex?: number;
  chapterIndex?: number;
  episodeIndex?: number;
  updatePayload: Partial<IBooks>;
}

export interface IBookDetails {
  title: string;
  prologue: string;
  image: string;
  episodes: Array<{
    actTitle: string;
    chapterTitle: string;
    episodeTitle: string;
    content: string;
  }>;
}

export interface IBookTitles {
  title: string;
  _id: string;
}
