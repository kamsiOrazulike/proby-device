import React from "react";
import { TeamMemberProps } from "../types";
import { AiFillLinkedin, AiFillInstagram } from "react-icons/ai";

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  title,
  description,
  hobbies,
  email,
  linkedin,
  instagram,
}) => (
  <div className="flex flex-col bg-gray-100 rounded-sm">
    <div className="flex-1 p-6 hover:cursor-default">
      <h4 className="text-sm uppercase font-light text-black/40">{title}</h4>
      <h3 className="text-2xl font-normal text-gray-900">{name}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="text-gray-600 italic">{hobbies}</p>

      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-600">{email}</span>
        <div className="flex gap-4">
          {linkedin && (
            <a href={linkedin} className="text-gray-600 hover:text-gray-900">
              <AiFillLinkedin size={20} />
            </a>
          )}
          {instagram && (
            <a href={instagram} className="text-gray-600 hover:text-gray-900">
              <AiFillInstagram size={20} />
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
      description:
        "5+ years experience in product design, from medical devices to furniture.",
      hobbies: "A cyclist with a keen eye for simple and powerful design.",
      email: "rosalie.valentiny23@imperial.ac.uk",
      linkedin: "#",
      instagram: "#",
    },
    {
      name: "Xinyu Cao",
      title: "Founder",
      description: "3+ years experience creating dynamic installations.",
      hobbies:
        "Sailing captain with a passion project developing artificial reefs.",
      email: "xinyu.cao23@imperial.ac.uk",
      linkedin: "#",
    },
    {
      name: "Jinhak Lee",
      title: "Head of Product",
      description:
        "5+ years experience in product design, from medical devices to furniture.",
      hobbies: "A cyclist with a keen eye for simple and powerful design.",
      email: "jinhak.lee23@imperial.ac.uk",
      linkedin: "#",
      instagram: "#",
    },
    {
      name: "Kamsi Orazulike",
      title: "Head of Technology",
      description: "10+ years experience in business and brand strategy.",
      hobbies: "An avid climber with an obsession with bio-materials.",
      email: "kamsiyonna.orazulike23@imperial.ac.uk",
      linkedin: "#",
      instagram: "#",
    },
  ];

  return (
    <div className="w-full border-b border-black/20 py-8">
      <div className="px-4">
        <h3 className="text-5xl font-thin mb-4">The Team</h3>
        <p className="text-black/70 mb-8">
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
