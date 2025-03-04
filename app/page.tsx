"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ContactForm from "./components/Form";
import TeamSection from "./components/Team";
import PageLoader from "./components/PageLoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageVisible, setPageVisible] = useState(false);

  const containerRef = useRef(null);

  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  // const featuresRef = useRef(null);
  const differentiationRef = useRef(null);
  const prototypesRef = useRef(null);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setPageVisible(true);
      }, 100);
    }, 1500);

    return () => clearTimeout(loaderTimer);
  }, []);

  useEffect(() => {
    if (!pageVisible || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline();
      heroTl.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          clearProps: "transform",
        }
      );

      const sections = [
        problemRef.current,
        solutionRef.current,
        differentiationRef.current,
        prototypesRef.current,
      ];

      sections.forEach((section, index) => {
        if (!section) return;

        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    };
  }, [pageVisible]);

  return (
    <>
      {/* Page Loader */}
      <PageLoader isLoading={isLoading} onLoadingComplete={() => {}} />

      {/* Main Content with performance optimization classes */}
      <div
        ref={containerRef}
        className={`w-full bg-white text-black main-content ${
          pageVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        {/* Hero Section */}
        <div className="w-full min-h-screen flex flex-col items-center justify-center pt-28 pb-12 px-4 md:px-8 bg-white">
          <div ref={heroRef} className="max-w-7xl w-full will-change-opacity">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-12 mt-12">
              {/* Left Column - Hero Image */}
              <div className="w-full md:w-1/2">
                <div className="relative h-[350px] md:h-[500px] w-full">
                  <Image
                    src="/static/imgs/hero-no-bg-2.svg"
                    alt="Proby Smart Fermentation Sensor"
                    fill={true}
                    className="mx-auto object-contain"
                    priority={true}
                  />
                </div>
              </div>

              {/* Right Column - Intro */}
              <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
                  Good for <span className="font-medium">Microbes</span> and{" "}
                  <span className="font-medium">Humans</span> alike!
                </h1>
                <p className="text-xl text-gray-700">
                  The smart fermentation sensor that monitors, guides, and
                  empowers you to create probiotic-rich foods for optimal gut
                  health.
                </p>
                <div className="pt-4">
                  <a
                    href="/dashboard"
                    className="inline-block bg-black text-white px-8 py-4 rounded-lg text-lg font-medium transition-transform hover:translate-y-[-2px]"
                  >
                    View Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="w-full">
          {/* Problem & Solution Section - Black Background */}
          <div className="bg-black text-white py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-16">
                {/* Problem Section */}
                <div
                  ref={problemRef}
                  className="w-full md:w-1/2 space-y-6 will-change-opacity"
                >
                  <h2 className="text-4xl font-light">The Problem</h2>
                  <div className="w-16 h-1 bg-white"></div>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Dysbiosis, a gut bacterial imbalance, can lead to digestive
                    issues, inflammation, hormonal imbalance, and weakened
                    immunity. While probiotic supplements offer some help,
                    fermented foods contain far more probiotics, but the
                    fermentation process is often seen as intimidating and hard
                    to control at home.
                  </p>
                </div>

                {/* Solution Section */}
                <div
                  ref={solutionRef}
                  className="w-full md:w-1/2 space-y-6 will-change-opacity"
                >
                  <h2 className="text-4xl font-light">The Solution</h2>
                  <div className="w-16 h-1 bg-white"></div>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Proby is a smart fermentation sensor that monitors microbial
                    activity, distinguishes between good and bad microbes, and
                    provides real-time insights to help you achieve perfect
                    fermentation every time. With Proby, you can confidently
                    ferment foods that are rich in probiotics, improving both
                    your gut health and your understanding of the process.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section - White Background */}
          <div
            // ref={featuresRef}
            className="bg-white text-black py-24 px-4 md:px-8 will-change-opacity"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-16 text-center">
                <h2 className="text-5xl font-light mb-4">User Map</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Monitoring and controlling probiotic cultures of bacteria and
                  yeast
                </p>
              </div>

              <div className="w-full bg-gray-100 rounded-2xl overflow-hidden mb-16">
                <div className="w-full border border-gray-200 bg-fermomap-1 bg-contain md:bg-cover bg-center bg-no-repeat h-[250px] md:h-[400px]" />
              </div>

              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-800 mb-8 leading-relaxed">
                  Proby doesn't just monitor fermentation, it educates and
                  empowers. By providing precise measurements of microbial
                  activity, airflow, temperature, pH, and humidity, we ensure
                  safety and quality in every batch of fermented food or drink.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <div className="font-medium text-xl mb-4">
                      Real-time Monitoring
                    </div>
                    <p>
                      Accurate monitoring of microbial activity in real time.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-xl">
                    <div className="font-medium text-xl mb-4">
                      Mobile Integration
                    </div>
                    <p>
                      Mobile app integration for detailed feedback and
                      fermentation guidance.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-xl">
                    <div className="font-medium text-xl mb-4">
                      Machine Learning
                    </div>
                    <p>
                      Machine learning capabilities to customize fermentation
                      preferences like taste, texture, and nutrient levels.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-xl">
                    <div className="font-medium text-xl mb-4">
                      Sustainable Health
                    </div>
                    <p>
                      Encourages a sustainable, health-conscious approach to gut
                      health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prototypes Section - White Background */}
          <div
            ref={prototypesRef}
            className="bg-white text-black py-24 px-4 md:px-8 border-t border-gray-100 will-change-opacity"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-16 text-center">
                <h2 className="text-5xl font-light mb-4">App Prototypes</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experience the Proby app interface before it launches
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Mobile Prototype */}
                <div className="bg-gray-50 p-8 rounded-xl text-center flex flex-col items-center">
                  <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12" y2="18" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium mb-3">
                    Mobile Prototype
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explore our mobile app design and experience the intuitive
                    interface.
                  </p>
                  <a
                    href="https://www.figma.com/proto/pn9XGdUGLSkwmWB3LNMHXP/Nutri-Tech?node-id=2090-51&p=f&viewport=440%2C261%2C0.08&t=V10SKdEQ8WFpf4v7-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2090%3A52&show-proto-sidebar=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-gray-800 hover:transform hover:translate-y-[-2px]"
                  >
                    View Mobile Prototype
                  </a>
                </div>

                {/* Tablet Prototype */}
                <div className="bg-gray-50 p-8 rounded-xl text-center flex flex-col items-center">
                  <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12" y2="18" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium mb-3">
                    Tablet Prototype
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Check out our tablet-optimized experience with enhanced
                    visualizations.
                  </p>
                  <a
                    href="https://www.figma.com/proto/pn9XGdUGLSkwmWB3LNMHXP/Nutri-Tech?node-id=2090-51&p=f&viewport=440%2C261%2C0.08&t=V10SKdEQ8WFpf4v7-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2184%3A1199&show-proto-sidebar=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-gray-800 hover:transform hover:translate-y-[-2px]"
                  >
                    View Tablet Prototype
                  </a>
                </div>

                {/* Dashboard Demo */}
                <div className="bg-gray-50 p-8 rounded-xl text-center flex flex-col items-center">
                  <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium mb-3">Dashboard Demo</h3>
                  <p className="text-gray-600 mb-6">
                    Experience our dashboard with real-time monitoring and
                    analytics.
                  </p>
                  <a
                    href="/dashboard"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-gray-800 hover:transform hover:translate-y-[-2px]"
                  >
                    View Demo
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Differentiation Section - Black Background */}
          <div
            ref={differentiationRef}
            className="bg-black text-white py-24 px-4 md:px-8 will-change-opacity"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Text Section */}
                <div className="w-full md:w-1/2 space-y-6">
                  <h2 className="text-4xl font-light">
                    What Sets Proby Apart?
                  </h2>
                  <div className="w-16 h-1 bg-white"></div>

                  <div className="space-y-8 mt-8">
                    <div className="border-l-2 border-white pl-6 py-2">
                      <h3 className="text-xl font-medium mb-2">
                        Fermentation Detectors
                      </h3>
                      <p className="text-white/90">
                        Products like Tilt or Plaato focus on parameters like
                        CO₂ or temperature. PROBY uniquely measures microbial
                        activity and bioavailability, directly addressing gut
                        health.
                      </p>
                    </div>

                    <div className="border-l-2 border-white pl-6 py-2">
                      <h3 className="text-xl font-medium mb-2">
                        Probiotic Supplements
                      </h3>
                      <p className="text-white/90">
                        Unlike supplements offering limited strains, Proby
                        emphasizes natural, diverse probiotics found in
                        fermented foods.
                      </p>
                    </div>

                    <div className="border-l-2 border-white pl-6 py-2">
                      <h3 className="text-xl font-medium mb-2">
                        Gut Health Products
                      </h3>
                      <p className="text-white/90">
                        Convenience products like probiotic shots are static.
                        Proby empowers users with real-time insights into the
                        active benefits of their fermented foods.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2">
                  <Image
                    src="/static/imgs/schematics.svg"
                    alt="Proby Device Schematics"
                    width={800}
                    height={800}
                    className="invert rounded-xl mx-auto transform hover:scale-105 transition-transform duration-500"
                    loading="lazy" // Lazy load images that are below the fold
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Team Section - White Background */}
          <div className="bg-white text-black py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <TeamSection />
            </div>
          </div>

          {/* Contact Section - Black Background */}
          <div id="contact" className="bg-black text-white py-24 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
