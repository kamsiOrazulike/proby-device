import Image from "next/image";
import ContactForm from "./Form";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {/* Hero Image */}
      <div className="w-full bg-schematic-1 bg-contain bg-left bg-no-repeat h-[400px]" />
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-start md:space-x-12 px-8 mb-8">
        {/* Left Column */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-4xl font-bold">PROBY</h2>
          <p className="text-black/70">
            Transforming the way we ferment food at home and professionally.
          </p>
          <p className="text-gray-500 text-sm">by NutriTech</p>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-2">The Problem</h3>
            <p className="text-black/70">
              Dysbiosis, a gut bacterial imbalance, can lead to digestive
              issues, inflammation, hormonal imbalance, and weakened immunity.
              While probiotic supplements offer some help, fermented foods
              contain far more probiotics, but the fermentation process is often
              seen as intimidating and hard to control at home.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">The Solution</h3>
            <p className="text-black/70">
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
      <div className="py-12 px-8 bg-gray-100">
        <div className="w-full md:border-[0.5px] border-black bg-fermomap-1 bg-contain md:bg-cover bg-left bg-no-repeat h-[200px] md:h-[300px] mb-8" />
        <h3 className="text-3xl font-black">PROBY</h3>
        <p className="text-md font-light text-black/40 mb-4">
          Monitoring and controlling probiotic cultures of bacteria and yeast
        </p>
        <div className="space-y-6">
          <p className="text-black/70">
            Proby doesn’t just monitor fermentation, it educates and empowers.
            By providing precise measurements of microbial activity, airflow,
            temperature, pH, and humidity, Proby ensures safety and quality in
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
      <div className="py-12 px-8 bg-white flex flex-col md:flex-row items-start align-baseline space-y-8 md:space-y-0 md:space-x-8 mb-8">
        <div className="flex flex-col space-y-4">
          <div className="w-full">
            <Image
              src="/static/imgs/schematics.png"
              alt="Exploded view"
              width={800}
              height={800}
              className="rounded-lg mx-auto md:mx-0"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="md:w-3/5 my-12 px-8">
          <h3 className="text-3xl font-black mb-4">What Sets Proby Apart?</h3>
          <p className="text-black/70">
            The market has three main categories of competitors, but Proby
            stands out:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <b>Fermentation Detectors:</b> Products like Tilt or Plaato focus
              on parameters like CO₂ or temperature. Proby uniquely measures
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
      </div>

      {/* Section 3: Team */}
      <div className="w-full">
        {/* Image */}
        <div className="w-full md:border-[0.5px] bg-center border-black bg-team bg-contain md:bg-cover bg-no-repeat h-[200px] md:h-[400px] mb-8" />

        {/* Content */}
        <div className="md:w-2/3 px-4">
          <h3 className="text-3xl font-black mb-4">Meet the Team</h3>
          <p className="text-black/70 mb-4">
            Proby is powered by a multidisciplinary team with expertise in:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Agricultural and food research for optimized fermentation.</li>
            <li>
              Industrial design to create a user-friendly device and interface.
            </li>
            <li>
              Chemical engineering to ensure precision in data measurement and
              device performance.
            </li>
            <li>
              Software development for app creation and real-time data analysis.
            </li>
          </ul>
          <p className="text-black/70 mt-4">
            Our diverse backgrounds, spanning Nigeria, France, China, and Korea,
            bring a unique perspective on food culture and health-conscious
            innovation. Together, we are redefining the future of fermentation.
          </p>
        </div>
      </div>

      {/* Section 5: Call to Action */}
      <ContactForm />
    </div>
  );
};

export default About;
