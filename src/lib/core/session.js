"use server"

import { headers } from "next/headers";
import { auth } from "../auth";


export const userSession=async()=>{
try{
    const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session)
  return session?.user
}
catch(error){
    console.log(error)
}

}