const EpisodeById = () => {
  const episodeData = [];
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">b</h1>
      <h2 className="text-xl font-semibold">by </h2>

      {/* Prologue */}
      {/* {ebookData.prologue && ( */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Prologue</h3>
        <p>n</p>
      </div>
      {/* )} */}

      {/* Acts, Chapters, and Episodes */}
      {/* {ebookData.acts.map((act, i) => ( */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">\</h3>
        {/* {act.chapters.map((chapter, j) => ( */}
        <div className="mt-4">
          <h4 className="text-xl font-bold">b</h4>
          <ul className="list-disc pl-6">
            {/* {chapter.episodes.map((episode, k) => ( */}
            <li className="text-lg">{/* {episode.title} */}</li>
            {/* // ))} */}
          </ul>
        </div>
        {/* ))} */}
      </div>
      {/* ))} */}
    </div>
  );
};

export default EpisodeById;
