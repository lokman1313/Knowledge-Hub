import { serverDeletetion, serverFetch } from "../core/server"

export const getAllBooks =async(query)=>{
    return serverFetch(`/api/all/books?${query}`)
}

export const getBookDeteils =async(id)=>{
    return serverFetch(`/api/book/${id}`)
}

export const getPendingBooks =async()=>{
    return serverFetch(`/api/pendingBooks`)
}


export const allBooksManupuletion =async()=>{
    return serverFetch(`/api/allBooks`)
}


export const bookDelete =async(id)=>{
    return serverDeletetion(`/api/deleteBook/${id}`)
}
