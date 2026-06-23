import { serverFetch } from "../core/server"


export const getBookInventory =async(librarianId)=>{
    return serverFetch(`/api/books?librarianId=${String(librarianId)}`)
}