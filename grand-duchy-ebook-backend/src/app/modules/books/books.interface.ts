export interface IEpisode {
  title: string;
  content: string;
  createdAt: Date;
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

// For simplicity, I have not included the IBookDetails interface in the snippet. You can find the complete code in the GitHub repository.
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
