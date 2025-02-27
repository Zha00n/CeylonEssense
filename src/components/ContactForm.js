export default function ContactForm() {
    return (
      <form className="space-y-4 ml-auo">
      <input
        type="text"
        placeholder="Name"
        className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-custom-green"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-custom-green"
      />
      <input
        type="text"
        placeholder="Subject"
        className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-custom-green"
      />
      <textarea
        placeholder="Message"
        rows="6"
        className="w-full text-gray-800 rounded-md px-4 border text-sm pt-2.5 outline-none focus:border-custom-green"
      ></textarea>
      <button
        type="button"
        className="text-white bg-custom-green hover:bg-custom-green rounded-md text-sm px-4 py-2.5 w-full !mt-6"
      >
        Send
      </button>
    </form>
    );
  }
  