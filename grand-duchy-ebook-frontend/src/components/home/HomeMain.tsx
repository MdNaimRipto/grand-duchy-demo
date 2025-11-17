import OpacityAnimation from "../animation/OpacityAnimation";
import AboutAuthor from "./about-author/AboutAuthor";
import AboutGrandDuchy from "./about-grand-duchy/AboutGrandDuchy";
import Banner from "./banner/Banner";
import Books from "./books/Books";
import Reviews from "./reviews/Reviews";
import ShareThoughts from "./share-thoughts/ShareThoughts";
import Upcoming from "./upcoming/Upcoming";

const HomeMain = () => {
  return (
    <OpacityAnimation>
      <>
        <Banner />
        <AboutGrandDuchy />
        <Books />
        <Upcoming />
        <AboutAuthor />
        <Reviews />
        <ShareThoughts />
      </>
    </OpacityAnimation>
  );
};

export default HomeMain;
