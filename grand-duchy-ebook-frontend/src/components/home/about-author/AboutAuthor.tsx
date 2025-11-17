import Image from "next/image";
import author from "@/assets/images/author.png";

const AboutAuthor = () => {
  return (
    <div className="grid md:grid-cols-2 items-center justify-center gap-4  py-8 lg:py-20">
      <div className="flex flex-col gap-4 max-w-[600px]">
        <h1 className="text-end uppercase italic text-4xl lg:text-6xl">
          Mustafa <br /> Sabri Bülbül
        </h1>
        <p className="text-end italic lg:text-xl ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
          impedit quaerat? Eligendi blanditiis dolor voluptatibus officiis eum
          quas reiciendis rem.
        </p>
      </div>
      <div className="max-w-[600px] grayscale">
        <Image src={author} alt="" />
      </div>
    </div>
  );
};

export default AboutAuthor;
