"use client";
import { useRouter } from "next/navigation";

const ErrorPage = (props: any) => {
  const router = useRouter();
  // const { error } = router.;
  console.log(props);
  return (
    <div>
      <h1>Authentication Error</h1>
      {/* {error && <p>{error}</p>} */}
    </div>
  );
};

export default ErrorPage;
