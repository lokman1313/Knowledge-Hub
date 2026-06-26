import { serverFetch } from "../core/server"


export const allTranjections=()=>{
    return serverFetch('/api/all/tranjections')
}