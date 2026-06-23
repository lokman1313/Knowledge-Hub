import { serverMutetion } from "../core/server"


export const postBookData=async(bookData)=>{
    return serverMutetion("/api/books",bookData)
}