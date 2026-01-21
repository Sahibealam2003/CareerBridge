import { useEffect, useState } from "react";
import { getJobs } from "../api/jobService";

const useJobs = (query, jobType) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getJobs(query, page);

        // ✅ FILTER LOGIC
        const filteredJobs = jobType
          ? data.filter((job) =>
              job.job_employment_types?.includes(jobType)
            )
          : data;

        setJobs(filteredJobs);
      } catch (err) {
        if (err.response?.status === 429) {
          setError("Too many requests. Please wait and try again.");
        } else {
          setError("Failed to load jobs");
        }
      } finally {
        setLoading(false);
      }
    };

    // ⏳ debounce
    const delay = setTimeout(fetchJobs, 600);

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query, page, jobType]);

  return { jobs, loading, error, page, setPage };
};

export default useJobs;
