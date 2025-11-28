import { Suspense } from "react";
import EmailVerifyComponent from "../../components/EmailVerifyComponent";

export default function EmailVerificationPage() {
  return (
    <Suspense>
      <EmailVerifyComponent />
    </Suspense>
  );
}
