import ServiceDetailPage from "../../../components/serviceDetailInfo";
import { ApiRoutes } from "../../../constant/constant";
import { notFound } from "next/navigation";

async function getService(serviceId) {
  const res = await fetch(`${ApiRoutes.getOneService}/${serviceId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const data = await res.json();
  console.log("initialServiceData:", data?.data);
  return data?.data;
}

// 🔹 Fetch All User Services (if needed)
// async function getUserServices() {
//   const res = await fetch(`${ApiRoutes.userGetService}`, {
//     next: { revalidate: 60 },
//   });
//   if (!res.ok) return [];

//   const data = await res.json();
//   console.log("userSericeData:", data?.data);
//   return data?.data || [];
// }

// 🔹 Dynamic Metadata (SEO)
export async function generateMetadata({ params }) {
  const { serviceId } = await params;
  const service = await getService(serviceId);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} | Your Company Name`,
    description: service.description,
  };
}

// 🔹 Main Page
const ServicePage = async ({ params }) => {
  const { serviceId } = await params;

  const service = await getService(serviceId);
  // const userServices = await getUserServices();

  if (!service) return notFound();

  return (
    <ServiceDetailPage
      initialServiceData={service}
      // userSericeData={userServices}
    />
  );
};

export default ServicePage;
