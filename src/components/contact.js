import {
  createContact,
  setSuccessMsg,
  setResError,
} from "../store/features/contactSlice";
import { useEffect, useState, startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSend } from "react-icons/fi";
import Image from "next/image";
// import { useRouter } from "next/navigation";

export default function ConatctComp() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //   const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { loading, successMsg, resError } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    startTransition(() => {
      setUser(storedUser);
    });

    if (successMsg || resError) {
      const timer = setTimeout(() => {
        dispatch(setSuccessMsg(null));
        dispatch(setResError(null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, successMsg, resError]);

  const handleAddConatcData = (e) => {
    e.preventDefault();

    if (!user) {
      dispatch(setResError("please login before submit"));
      //   setResError("please login before submit");
      return;
    }

    const contactData = {
      name,
      email,
      message,
    };

    dispatch(createContact(contactData))
      .unwrap()
      .then(() => {
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      });
  };
  
  return (
    <>
      <section className="w-full py-12 px-4 md:px-10">
        <div className="max-w-7xl mx-auto  overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 md:flex items-center justify-center">
              <Image
                src={"/contact-img.png"}
                alt="Contact illustration"
                width={700}
                height={700}
                className=" w-full h-full object-contain rounded-lg"
                priority
              />
            </div>

            <div className="w-full md:w-1/2 p-6 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-600 mb-2 drop-shadow-[0_4px_15px_rgba(236,72,153,0.4)]">
                Get in touch
              </h2>
              <p className="text-gray-600 mb-6">
                Have a question or want to work together? Send us a message and
                we&apos;ll get back to you.
              </p>

              <form onSubmit={handleAddConatcData} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200
           focus:outline-none focus:ring-2 focus:ring-pink-300
           transition drop-shadow-[0_3px_12px_rgba(236,72,153,0.25)]"
                    placeholder="Your name"
                    type="text"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200
           focus:outline-none focus:ring-2 focus:ring-pink-300
           transition drop-shadow-[0_3px_12px_rgba(236,72,153,0.25)]"
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 drop-shadow-[0_3px_12px_rgba(236,72,153,0.25)] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition  min-h-[140px]"
                    placeholder="Write your message..."
                  />
                </div>

                {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
                {resError && (
                  <p className="text-red-600 bg-red-100 px-3 py-2 rounded-lg mb-3">
                    {resError}
                  </p>
                )}
                {successMsg && (
                  <p className="bg-green-100 rounded-md px-3 py-2 text-green-600 text-sm">
                    {successMsg}
                  </p>
                )}
                {/* {loading && <p className="text-pink-600 text-sm">Sending...</p>} */}

                <div className="flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 w-full sm:w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-xl transition"
                  >
                    <FiSend />
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                  </button>

                  {/* Optional small note or phone */}
                  {/* <div className="text-sm text-gray-500">
                    <p>Or call us:</p>
                    <p className="font-medium text-gray-700">+92 300 1234567</p>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
