import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // To track submission status
  const [showStatus, setShowStatus] = useState(false); // To control visibility of the status message
  const [formError, setFormError] = useState(""); // To handle form validation error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormError("Please fill out all required fields.");
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormError(""); // Clear previous errors if the form is valid

    // Web3Forms API endpoint
    const endpoint = "https://api.web3forms.com/submit";

    // Replace this with your Web3Forms access key
    const accessKey = "10faa3be-d4c7-4048-838f-993bdfe2dfb1";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      setStatus("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
      setShowStatus(true); // Show status message
    } else {
      setStatus("Oops! Something went wrong. Please try again.");
      setShowStatus(true); // Show status message
    }

    // Hide the status message after 5 seconds
    setTimeout(() => {
      setShowStatus(false);
    }, 5000);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-4 ml-auo">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-custom-green"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-custom-green"
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-custom-green"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows="6"
          required
          className="w-full text-gray-800 rounded-md px-4 border text-sm pt-2.5 outline-none focus:border-custom-green"
        ></textarea>

        {/* Show validation error message */}
        {formError && (
          <div className="text-sm text-center text-red-500">
            {formError}
          </div>
        )}

        {/* Show status message above the submit button */}
        {showStatus && (
          <div className="absolute px-6 py-1 text-[12px] text-center text-white rounded-md bottom-12 bg-custom-green/60 left-16">
            {status}
          </div>
        )}

        <button
          type="submit"
          className="text-white bg-custom-green hover:bg-custom-green/80 rounded-md text-sm px-4 py-2.5 w-full !mt-8 
            transition transform duration-150 ease-in-out active:scale-95"
        >
          Send
        </button>
      </form>
    </div>
  );
}
