import axiosInstance from "./axiosInstance";

export const getJobs = async (query, page = 1, jobType = "") => {
  if (!query) return [];

  let finalQuery = query;

  if (jobType) {
    finalQuery = `${query} ${jobType}`;
  }

  const params = {
    query: finalQuery,
    page,
  };

  const res = await axiosInstance.get("/search", { params });
  return res.data.data || [];
};
