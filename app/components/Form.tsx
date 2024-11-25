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

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, lastName, email, organisation, subject, message } =
      formData;

    // Create email content
    const mailtoLink = `mailto:contact@carboncell.co?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nOrganisation: ${organisation}\n\nMessage:\n${message}`
    )}`;

    // Open the email client with pre-filled details
    window.location.href = mailtoLink;
  };

  return (
    <div className="py-24 px-12 lg:px-[20rem] bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h3 className="text-3xl font-black text-center">Get in Touch</h3>
        <p className="text-black/70 text-center mb-8">
          Fill out the form below!
        </p>

        {/* Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
              className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
              className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
              className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
              className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
              className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
              className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Consent */}
          <div className="mb-4 md:col-span-2 flex items-center">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2 focus:ring-2 focus:ring-gray-500"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              I want to receive updates.
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="px-32 py-2 uppercase bg-black border border-black text-white text-sm font-medium hover:bg-transparent hover:text-black transition-all"
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
