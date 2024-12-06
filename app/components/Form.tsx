import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    subject: "",
    message: "",
    consent: true,
  });

  // Input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (e.target.type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prevData) => ({
        ...prevData,
        [id]: target.checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  // Submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, organisation, subject, message } =
      formData;

    const mailtoLink = `mailto:contact@carboncell.co?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nOrganisation: ${organisation}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="py-24 px-8 lg:px-[20rem] bg-hero-2 bg-cover bg-no-repeat">
      <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-sm text-black p-6 rounded-lg">
        {/* Header */}
        <h3 className="text-3xl font-black text-center">Get in Touch</h3>
        <p className="text-black/70 text-center mb-8">
          Fill out the form below!
        </p>

        {/* Form */}
        <form
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-sm font-medium">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border bg-transparent border-[#1A1A3E] p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border bg-transparent border-[#1A1A3E] p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border bg-transparent border-[#1A1A3E] p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Organisation */}
          <div className="flex flex-col">
            <label htmlFor="organisation" className="text-sm font-medium">
              Organisation
            </label>
            <input
              type="text"
              id="organisation"
              value={formData.organisation}
              onChange={handleChange}
              className="border bg-transparent border-[#1A1A3E] p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Subject */}
          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border bg-transparent border-[#1A1A3E] p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="message" className="text-sm font-medium">
              Leave us a message... *
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="border bg-transparent border-[#1A1A3E] p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Consent */}
          <div className="mb-4 md:col-span-2 flex items-center">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2 bg-[#1A1A3E] focus:ring-2 focus:ring-gray-500"
            />
            <label htmlFor="consent" className="text-sm text-black">
              I want to receive updates.
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="w-full py-2 uppercase bg-transparent border border-[#1A1A3E] text-[#1A1A3E] text-sm font-medium hover:bg-[#1A1A3E] hover:text-white transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
