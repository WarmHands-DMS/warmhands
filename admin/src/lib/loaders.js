import apiReq from './apiReq';

export const IncidentPageLoader = async ({ params }) => {
  const res = await apiReq.get(`/incidents/${params.id}`);
  return res.data;
};

export const SendEmailPageLoader = async ({ params }) => {
  const incidentRes = await apiReq.get(`/incidents/${params.id}`);

  // Fetch user count by city
  const userCountRes = await apiReq.get(
    `/users/count/${incidentRes.data.city}`
  );

  // Adjust based on the expected response structure
  return {
    ...incidentRes.data,
    userCount: userCountRes.data.userCount, // Ensure this matches the API response
  };
};
