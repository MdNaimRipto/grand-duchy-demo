import Image from "next/image";
import banner from "@/assets/images/about-grand-duchy.webp";

const AboutGrandDuchy = () => {
  return (
    <section className="mt-20 px-4">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="w-full h-[350px] md:h-[700px] overflow-hidden">
          <Image
            src={banner}
            alt="About-Grand-Duchy"
            className="w-full h-full object-contain grayscale"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-6">
          <h1 className="titleFont text-3xl md:text-4xl lg:text-5xl font-semibold">
            About Grand Duchy
          </h1>

          <p className="textFont leading-relaxed text-base md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            porro magni voluptatem debitis sunt tempora ut, ullam maxime
            obcaecati sapiente facere impedit necessitatibus id eos delectus
            incidunt excepturi. Voluptatum, voluptatem ipsum. Harum magnam,
            saepe totam sequi quae illo provident expedita asperiores sapiente
            maxime eaque, atque soluta unde vero maiores, ex veritatis ullam ad
            debitis dolores excepturi consectetur sit fugiat. Officiis!
          </p>

          <button className="px-6 py-2 w-fit bg-darkPaper text-white rounded-lg">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutGrandDuchy;
