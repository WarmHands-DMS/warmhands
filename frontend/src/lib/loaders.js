import apiReq from "./apiReq"

export const singlePageLoader = async ({request, params}) => {
    const res = await apiReq("/incidents/"+params.id)
    return res.data;
}