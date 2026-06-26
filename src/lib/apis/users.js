import { serverFetch } from "../core/server"


export const allUser =async()=>{
    return serverFetch("/api/all/users")
}