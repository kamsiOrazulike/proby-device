"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    subject: "",
    message: "",
    consent: true,
  });

  useEffect(() => {
    if (formRef.current) {
      gsap.from(formRef.current.querySelectorAll(".form-field"), {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.3,
      });
    }
  }, []);

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
    <div className="py-16 px-8 lg:px-16 bg-black text-white">
      <div ref={formRef} className="max-w-4xl mx-auto">
        {/* Header */}
        <h3 className="text-4xl font-normal text-center mb-2">Get in Touch</h3>
        <div className="w-20 h-0.5 bg-white mx-auto mb-12"></div>

        {/* Form */}
        <form
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
          onSubmit={handleSubmit}
        >
          {/* First Name */}
          <div className="flex flex-col form-field">
            <label htmlFor="firstName" className="text-sm mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border-b border-white/30 bg-transparent py-2 px-1 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col form-field">
            <label htmlFor="lastName" className="text-sm mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border-b border-white/30 bg-transparent py-2 px-1 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col form-field">
            <label htmlFor="email" className="text-sm mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-b border-white/30 bg-transparent py-2 px-1 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Organisation */}
          <div className="flex flex-col form-field">
            <label htmlFor="organisation" className="text-sm mb-2">
              Organisation
            </label>
            <input
              type="text"
              id="organisation"
              value={formData.organisation}
              onChange={handleChange}
              className="border-b border-white/30 bg-transparent py-2 px-1 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Subject */}
          <div className="md:col-span-2 flex flex-col form-field">
            <label htmlFor="subject" className="text-sm mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border-b border-white/30 bg-transparent py-2 px-1 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2 flex flex-col form-field">
            <label htmlFor="message" className="text-sm mb-2">
              Leave us a message... *
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="border border-white/30 bg-transparent p-3 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Consent */}
          <div className="mb-4 md:col-span-2 flex items-center form-field">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2 appearance-none w-5 h-5 border border-white/30 checked:bg-white checked:border-white focus:outline-none"
            />
            <label htmlFor="consent" className="text-sm text-white/80">
              I want to receive updates.
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center form-field mt-4">
            <button
              type="submit"
              className="w-full py-3 px-8 bg-white text-black text-sm uppercase font-medium tracking-wide hover:bg-white/90 transition-all"
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
