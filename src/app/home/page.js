import HomeRoute from "@/components/homeSeverComp";
import { ApiRoutes } from "../../constant/constant";

const HomePage = async () => {
  // Services
  const serviceRes = await fetch(ApiRoutes.getService, {
    cache: "no-store",
  });
  const serviceData = await serviceRes.json();

  // Blogs
  const blogRes = await fetch(ApiRoutes.getBlog, {
    cache: "no-store",
  });
  const blogData = await blogRes.json();

  // Reviews
  const reviewRes = await fetch(ApiRoutes.getReview, {
    cache: "no-store",
  });
  const reviewData = await reviewRes.json();

  return (
    <div>
      <HomeRoute
        initialServiceData={serviceData?.data || []}
        initialBlogData={blogData?.data || []}
        initialReviewData={reviewData?.data || []}
      />
    </div>
  );
};
export default HomePage;
