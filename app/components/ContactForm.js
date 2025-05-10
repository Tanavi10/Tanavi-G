import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_wja94jo', 'template_xyufstw', e.target, '4I4dl675kKUt71KKzrC_q')  // Use your correct service ID, template ID, and user ID
      .then(
        (result) => {
          console.log(result.text);
          alert('Message sent successfully!');
        },
        (error) => {
          console.log(error.text);
          alert('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <form onSubmit={sendEmail}>
      <div>
        <label htmlFor="from_name">Name:</label>
        <input
          type="text"
          id="from_name"
          name="from_name"
          value={formData.from_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="from_email">Email:</label>
        <input
          type="email"
          id="from_email"
          name="from_email"
          value={formData.from_email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Send Message</button>
    </form>
  );
};

export default ContactForm;
