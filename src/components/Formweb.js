import React, { useState } from "react";

function Formweb() {
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
    <div className="mt-[100px] pb-[100px]">
      <div className="grid sm:grid-cols-2 items-start gap-12 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md font-[sans-serif]">
        <div>
          <h1 className="text-3xl font-bold text-gray-800/70">Let's Talk</h1>
          <p className="mt-4 text-sm text-gray-500/70">
            Have some big idea or brand to develop and need help? Then reach
            out we'd love to hear about your project and provide help.
          </p>

          <div className="mt-12">
            <h2 className="text-base font-bold text-gray-800/70">Email</h2>
            <ul className="mt-4">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="#1D9325"
                    viewBox="0 0 479.058 479.058"
                  >
                    <path
                      d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                <a
                  href="javascript:void(0)"
                  className="ml-4 text-sm text-custom-green"
                >
                  <small className="block">Mail</small>
                  <strong>info@ceylonessence.com</strong>
                </a>
              </li>
            </ul>
          </div>
        </div>

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
            <div className="absolute text-sm text-center text-red-500">
              {formError}
            </div>
          )}

          {/* Show status message above the submit button */}
          {showStatus && (
            <div className="absolute px-6 py-1 text-[12px] text-center text-white rounded-md bg-custom-green/60 ml-12">
              {status}
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-custom-green hover:bg-custom-green/80 rounded-md text-sm px-4 py-2.5 w-full !mt-12"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Formweb;
