import Image from "next/image";
import author from "@/assets/images/author.png";

const AboutAuthor = () => {
  return (
    <div>
      <h3 className="text-center text-beige text-[80px] md:text-[140px] lg:text-[200px]">
        Author
      </h3>

      <div className="md:-mt-24 lg:-mt-32 grid md:grid-cols-2 items-center gap-8 xl:gap-0 justify-items-center">
        <div className="md:hidden w-full h-full object-cover  grayscale">
          <Image src={author} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-4 lg:max-w-[600px] l">
          <h1 className="md:text-end titleFont text-5xl font-semibold tracking-wide">
            Mustafa <br /> Sabri Bülbül
          </h1>
          <p className="md:text-end italic lg:text-xl ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
            impedit quaerat? Eligendi blanditiis dolor voluptatibus officiis eum
            quas reiciendis rem.
          </p>
        </div>
        <div className="hidden md:block max-w-[600px] grayscale w-full h-full object-cover">
          <Image src={author} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
