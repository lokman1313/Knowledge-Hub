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

export const getToken=async()=>{
    const session = await auth.api.getSession({
        headers: await headers() })
    return session?.session?.token || null
}