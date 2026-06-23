

const baseurl = process.env.NEXT_PUBLIC_BASE_URL

export const serverFetch =async(path)=>{
    const res = await fetch(`${baseurl}${path}`)
    return res.json()
}

export const serverMutetion=async(path,data,method="POST")=>{
    const res = await fetch(`${baseurl}${path}`,{
        method : method,
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
    })

    return res
}