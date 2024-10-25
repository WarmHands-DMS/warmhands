import apiReq from "./apiReq"

export const singlePageLoader = async ({params}) => {
    const res = await apiReq.get(`/incidents/${params.id}`);
    return res.data;
}


