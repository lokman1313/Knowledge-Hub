import { serverFetch } from "../core/server"

export const getAllBooks =async(query)=>{
    return serverFetch(`/api/all/books?${query}`)
}