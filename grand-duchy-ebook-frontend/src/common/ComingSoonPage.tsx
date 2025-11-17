import { IBookDetails } from "@/types/bookTypes";
import { CgSandClock } from "react-icons/cg";
import { IoMdBook } from "react-icons/io";

const ComingSoonPage = ({ book }: { book: IBookDetails }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6 py-10 bg-white shadow-lg rounded-lg ">
        <h1 className="text-3xl md:text-4xl tracking-widest uppercase titleFont text-primary">
          {book.title}
        </h1>
        <p className="text-lg italic text-gray mt-2">by Sabri BÜLBÜL</p>
        <p className="mt-6 text-xl font-semibold flex items-center justify-center gap-2">
          <IoMdBook /> Coming Soon...
        </p>
        <p className="mt-2">Stay tuned for the exciting journey ahead!</p>
        <div className="mt-6 animate-bounce text-4xl text-gray flex justify-center">
          <CgSandClock />
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
