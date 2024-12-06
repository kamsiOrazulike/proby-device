import React from "react";
import { TeamMemberProps } from "../types";
import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  title,
  description,
  email,
  linkedin,
}) => (
  <div className="flex flex-col border border-white rounded-md">
    <div className="flex-1 p-6 hover:cursor-default">
      <h4 className="text-sm uppercase font-light text-white/40">{title}</h4>
      <h3 className="text-2xl font-normal text-white">{name}</h3>
      <p className="text-white">{description}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-4">
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-white/40 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineMail size={20} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              className="text-white/40 hover:text-white"
            >
              <AiFillLinkedin size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Rosalie Valentiny",
      title: "Founder",
      description: "2+ years experience in Data Science",
      email: "rosalie.valentiny23@imperial.ac.uk",
      linkedin: "https://www.linkedin.com/in/rosalie-valentiny/",
    },
    {
      name: "Xinyu Cao",
      title: "Founder",
      description: "2+ years experience in Materials Design and Chemistry",
      email: "xinyu.cao23@imperial.ac.uk",
      linkedin: "https://www.linkedin.com/in/xinyu-cao-937ba728b/",
    },
    {
      name: "Jinhak Lee",
      title: "Head of Product",
      description: "10+ years experience in Industrial Design",
      email: "jinhak.lee23@imperial.ac.uk",
      linkedin: "https://www.linkedin.com/in/jinhak/",
    },
    {
      name: "Kamsi Orazulike",
      title: "Head of Technology",
      description: "2+ years experience in Software Development",
      email: "kamsiyonna.orazulike23@imperial.ac.uk",
      linkedin: "https://www.linkedin.com/in/kamsiyonnaorazulike",
    },
  ];

  return (
    <div className="w-full border-b border-white/20 py-8">
      <div className="px-4">
        <h3 className="text-5xl font-thin mb-4">The Team</h3>
        <p className="text-white/70 mb-8">
          Proby is powered by a multidisciplinary team with expertise in
          agricultural research, industrial design, chemical engineering, and
          software development. Our diverse backgrounds, spanning Nigeria,
          France, China, and Korea, bring a unique perspective on food culture
          and health-conscious innovation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>

        {/* <div className="w-full md:border-[0.5px] bg-[center_top_-80px] border-black bg-team bg-cover bg-no-repeat h-[200px] md:h-[400px] my-4" /> */}
      </div>
    </div>
  );
};

export default TeamSection;
