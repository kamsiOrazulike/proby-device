/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import ContactForm from "../components/Form";
import TeamSection from "../components/Team";
import ImageWithLoader from "../components/ImageWithLoader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const About = () => {
  return (
    <div className="flex flex-col w-full bg-gradient-to-t from-[#5252AE] to-[#2C3192] pt-24 md:pt-44">
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-end md:space-x-12 px-8 mb-8 border-b border-white/20 pb-8">
        {/* Left Column */}
        <div className="w-full md:w-1/2 mb-4">
          {/* Hero Image */}
          <div className="relative">
            <ImageWithLoader
              src="/static/imgs/hero-final.svg"
              alt="Hero"
              fill={true}
              loadingTime={2000}
              className="mx-auto md:mx-0"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 space-y-8">
          <div>
            <h3 className="text-2xl font-thin mb-2">The Problem</h3>
            <p className="text-white/70">
              Dysbiosis, a gut bacterial imbalance, can lead to digestive
              issues, inflammation, hormonal imbalance, and weakened immunity.
              While probiotic supplements offer some help, fermented foods
              contain far more probiotics, but the fermentation process is often
              seen as intimidating and hard to control at home.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-thin mb-2">The Solution</h3>
            <p className="text-white/70">
              Proby is a smart fermentation sensor that monitors microbial
              activity, distinguishes between good and bad microbes, and
              provides real-time insights to help you achieve perfect
              fermentation every time. With Proby, you can confidently ferment
              foods that are rich in probiotics, improving both your gut health
              and your understanding of the process.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Features */}
      <div className="py-12 px-8 border-b border-white/20 pb-8">
        <div className="w-full md:border-[0.5px] border-white bg-fermomap-1 bg-contain md:bg-cover bg-left bg-no-repeat h-[200px] md:h-[300px] mb-8" />
        <h3 className="text-4xl font-thin">User Map</h3>
        <p className="text-md font-light text-white/40 mb-4">
          Monitoring and controlling probiotic cultures of bacteria and yeast
        </p>
        <div className="space-y-6">
          <p className="text-white/70">
            Proby doesn’t just monitor fermentation, it educates and empowers.
            By providing precise measurements of microbial activity, airflow,
            temperature, pH, and humidity, we ensures safety and quality in
            every batch of fermented food or drink.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Accurate monitoring of microbial activity in real time.</li>
            <li>
              Mobile app integration for detailed feedback and fermentation
              guidance.
            </li>
            <li>
              Machine learning capabilities to customize fermentation
              preferences like taste, texture, and nutrient levels.
            </li>
            <li>
              Encourages a sustainable, health-conscious approach to gut health.
            </li>
          </ul>
        </div>
      </div>

      {/* Section 4: Market Differentiation */}
      <div className="py-12 px-8 flex flex-col md:flex-row items-start align-baseline space-y-8 md:space-y-0 md:space-x-8 border-b border-white/20 pb-8">
        {/* Text Section */}
        <div className="w-full md:w-3/5 my-12">
          <h3 className="text-4xl font-thin mb-4">What Sets Proby Apart?</h3>
          <p className="text-white/70">
            The market has three main categories of competitors, but here are
            some areas where PROBY stands out:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <b>Fermentation Detectors:</b> Products like Tilt or Plaato focus
              on parameters like CO₂ or temperature. PROBY uniquely measures
              microbial activity and bioavailability, directly addressing gut
              health.
            </li>
            <li>
              <b>Probiotic Supplements:</b> Unlike supplements offering limited
              strains, Proby emphasizes natural, diverse probiotics found in
              fermented foods.
            </li>
            <li>
              <b>Gut Health Products:</b> Convenience products like probiotic
              shots are static. Proby empowers users with real-time insights
              into the active benefits of their fermented foods.
            </li>
          </ul>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="w-full">
            <Image
              src="/static/imgs/schematics.svg"
              alt="Exploded view"
              width={800}
              height={800}
              className="rounded-lg mx-auto md:mx-0"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Team */}
      <TeamSection />

      {/* Section 5: Call to Action */}
      <ContactForm />
    </div>
  );
};

export default About;
