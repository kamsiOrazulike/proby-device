import React, { useEffect, useRef } from "react";
import { TeamMemberProps } from "../types";
import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import gsap from "gsap";

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  title,
  email,
  linkedin,
}) => (
  <div className="flex flex-col border-b border-r border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300">
    <div className="flex-1 p-8 hover:cursor-default">
      <h4 className="text-sm uppercase font-light text-gray-500 mb-1">
        {title}
      </h4>
      <h3 className="text-2xl font-normal text-black mb-3">{name}</h3>
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-4">
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-gray-400 hover:text-black transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Email ${name}`}
            >
              <AiOutlineMail size={22} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              className="text-gray-400 hover:text-black transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn profile of ${name}`}
            >
              <AiFillLinkedin size={22} />
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

const TeamSection = () => {
  const sectionRef = useRef(null);
  const teamGridRef = useRef(null);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 60%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".team-member", {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: teamGridRef.current,
        start: "top 80%",
        end: "top 60%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const teamMembers = [
    {
      name: "Rosalie Valentiny",
      title: "Data Analyst | User Researcher",
      email: "rosalie.valentiny23@imperial.ac.uk",
      linkedin: "https://www.linkedin.com/in/rosalie-valentiny/",
    },
    {
      name: "Xinyu Cao",
      title: "Material Researcher",
      email: "xinyu.cao23@imperial.ac.uk",
      linkedin: "https://www.linkedin.com/in/xinyu-cao-937ba728b/",
    },
    {
      name: "Jinhak Lee",
      title: "Product | Industrial Designer",
      email: "jinhak.lee23@imperial.ac.uk",
      linkedin: "https://www.linkedin.com/in/jinhak/",
    },
    {
      name: "Kamsi Orazulike",
      title: "Software | Electronics Engineer",
      email: "kamsiyonna.orazulike23@imperial.ac.uk",
      linkedin: "https://www.linkedin.com/in/kamsiyonnaorazulike",
    },
  ];

  return (
    <div ref={sectionRef} className="w-full py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-normal mb-4">The Team</h2>
        <div className="w-20 h-0.5 bg-black mb-6"></div>
        <p className="text-gray-700 mb-12 max-w-3xl">
          Proby is powered by a multidisciplinary team with expertise in
          agricultural research, industrial design, chemical engineering, and
          software development. Our diverse backgrounds, spanning Nigeria,
          France, China, and Korea, bring a unique perspective on food culture
          and health-conscious innovation.
        </p>

        <div
          ref={teamGridRef}
          className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-gray-200"
        >
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <TeamMember {...member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
