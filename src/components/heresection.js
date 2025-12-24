import Link from "next/link";
import RatingBadge from "@/components/RatingBadge";

export default function HereSection({ reviewData }) {
  const features = [
    {
      title: "Fast Delivery",
      desc: "MVPs in 2-4 weeks base on project scope.",
    },
    {
      title: "Transparent Pricing",
      desc: "No surprise costs.",
    },
    {
      title: "Support",
      desc: "Monthly maintenance plans.",
    },
  ];

  const overallRating =
    reviewData.length > 0
      ? (
          reviewData.reduce((acc, review) => acc + Number(review.rating), 0) /
          reviewData.length
        ).toFixed(1)
      : 0;

  return (
    <section className="w-full py-24 relative overflow-hidden bg-gradient-to-b from-pink-200 via-pink-50 to-white">
      <div className="container mx-auto px-6 mt-10 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
          Professional <span className="text-pink-600">Digital Services</span>
          <br />
          that grow your business
        </h1>

        <p className="mt-6 text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
          We design, build and launch modern websites, e-commerce stores, and
          brand experiences that convert visitors into customers. Fast delivery
          — measured results.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/home#contact"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-pink-700 transform transition duration-300 hover:scale-105"
          >
            Get a Quote
          </Link>
          <Link
            href="/home#services"
            className="text-pink-600 border border-pink-600 px-6 py-3 rounded-lg font-medium hover:bg-pink-50 hover:text-pink-700 transition duration-300"
          >
            Explore Services
          </Link>
        </div>

        <div className="w-60 mx-auto mt-12">
          <div className="rounded-lg bg-gradient-to-br from-pink-400 to-indigo-400 p-5 text-white shadow-xl flex flex-col items-center">
            <div className="text-sm font-bold uppercase tracking-wide">
              Client Reviews
            </div>
            <div className="font-bold text-lg mt-1">
              <RatingBadge rating={overallRating} />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 bg-white text-center p-8 rounded-lg shadow-xl"
            >
              <div className="text-blue-600 bg-blue-100 rounded-full p-2">
                <svg
                  className="w-6 h-6 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    // <section className="w-full bg-gradient-to-b from-pink-100 via-pink-50 to-white p-6 mt-14 md:mt-10">
    //   <div className="container mx-auto px-6 py-7 lg:py-24">
    //     <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
    //       {/* Left: Text */}
    //       <div className="lg:col-span-7">
    //         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
    //           Professional{" "}
    //           <span className="text-pink-600">Digital Services</span>
    //           <br /> that grow your business.
    //         </h1>

    //         <p className="mt-4 text-gray-600 max-w-2xl text-base sm:text-lg">
    //           We design, build and launch modern websites, e-commerce stores,
    //           and brand experiences that convert visitors into customers. Fast
    //           delivery — measured results.
    //         </p>

    //         {/* CTAs */}
    //         <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
    //           <Link
    //             href="/contact"
    //             className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg font-semibold transition"
    //           >
    //             Get a Quote
    //           </Link>

    //           <Link
    //             href="/services"
    //             className="inline-block text-pink-600 px-5 py-3 rounded-lg font-medium hover:underline"
    //           >
    //             Explore Services
    //           </Link>
    //         </div>

    //         {/* Features */}
    //         <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
    //           {features.map((item, index) => (
    //             <div key={index} className="flex items-start gap-3">
    //               <div className="mt-1 text-pink-600">
    //                 <FaCheckCircle className="w-5 h-5" />
    //               </div>

    //               <div>
    //                 <h4 className="font-semibold text-gray-900">
    //                   {item.title}
    //                 </h4>
    //                 <p className="text-sm text-gray-500">{item.desc}</p>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //         {/* Trust badges */}
    //         {/* <div className="mt-8 flex items-center gap-6">
    //           <div className="text-sm text-gray-500">Trusted by</div>
    //           <div className="flex items-center gap-4">
    //             <div className="h-6 w-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
    //               Brand A
    //             </div>
    //             <div className="h-6 w-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
    //               Brand B
    //             </div>
    //             <div className="h-6 w-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
    //               Brand C
    //             </div>
    //           </div>
    //         </div> */}
    //       </div>

    //       {/* Right: Illustration / Cards */}
    //       <div className="lg:col-span-5">
    //         <div className="relative -mx-4 sm:mx-0">
    //           <Image
    //             src={"/hero-imag2.gif"}
    //             alt={"hero-image"}
    //             width={900}
    //             height={900}
    //             className="object-cover w-full h-full rounded-lg transition-all duration-300 hidden sm:block"
    //             // className="object-cover w-full h-full hidden rounded-lg transition-all duration-300"
    //             priority
    //           />
    //           {/* <div className="rounded-2xl bg-white shadow-lg p-6">
    //             <div className="flex items-center justify-between">
    //               <div>
    //                 <h3 className="text-lg font-semibold">Web Design + Dev</h3>
    //                 <p className="text-sm text-gray-500">
    //                   Full-stack, responsive.
    //                 </p>
    //               </div>
    //               <div className="text-pink-600 font-bold">PKR 25,000+</div>
    //             </div>

    //             <div className="mt-4 grid grid-cols-2 gap-3">
    //               <div className="bg-gray-50 rounded-lg p-3">
    //                 <div className="text-xs text-gray-500">Pages</div>
    //                 <div className="font-semibold">Up to 10</div>
    //               </div>
    //               <div className="bg-gray-50 rounded-lg p-3">
    //                 <div className="text-xs text-gray-500">E-commerce</div>
    //                 <div className="font-semibold">Optional</div>
    //               </div>
    //             </div>

    //             <div className="mt-6 flex gap-3">
    //               <Link
    //                 href="/contact"
    //                 className="flex-1 inline-block text-center bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium transition"
    //               >
    //                 Start Project
    //               </Link>
    //               <Link
    //                 href="/pricing"
    //                 className="inline-block px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
    //               >
    //                 See Pricing
    //               </Link>
    //             </div>
    //           </div> */}

    //           <div className="absolute top-1 sm:top-90 lg:top-100 md:top-130 -right-2 sm:-right-6 -bottom-6 w-full sm:w-48 transform rotate-0 sm:rotate-3">
    //             <div className="rounded-xl bg-gradient-to-br from-pink-400 to-indigo-400 p-4 text-white shadow-xl transition-transform duration-300 hover:scale-105">
    //               <div className="text-sm">clients reviews</div>
    //               <div className="font-bold text-lg">
    //                 <RatingBadge rating={overallRating} />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
