"use client";

//import { useRouter } from "next/navigation";
//import { useAuthContext } from "../context/AuthContext";
import FeedMaps from "@/components/common/FeedMaps";


function Page() {
  //const { userAuth, logout } = useAuthContext();
  //const router = useRouter();

  //console.log(userAuth);

  //if (userAuth == null) {
    //router.push("/singIn");
  //}

  return (
    <>
      
        <main>
           <FeedMaps />
           {/*<button onClick={() => logout()}>Sign Out</button>*/}
        </main>
    
    </>
  );
}

export default Page;