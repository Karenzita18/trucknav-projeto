
"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import FeedMaps from "@/components/common/FeedMaps";

function Page() {
  const { userAuth } = useAuthContext();
  const router = useRouter();

  console.log(userAuth);

  if (userAuth == null) {
    router.push("/signIn");
  }

  return (
    <>
      {userAuth && (
 
          <FeedMaps />
          
       
      )}
    </>
  );
};
export default Page;