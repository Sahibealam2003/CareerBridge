import { useState } from "react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import useJobs from "../hook/useJobs";
import Navbar from "./Navbar";
import GridLoader from "react-spinners/GridLoader";
const Home = () => {
  const [query, setQuery] = useState("developer");

  const [jobType, setJobType] = useState("");

  const { jobs, loading, error, page, setPage } = useJobs(query, jobType);

  const jobTypes = [
    { label: "All", value: "" },
    { label: "Full-time", value: "FULLTIME" },
    { label: "Internship", value: "INTERN" },
    { label: "Contractor", value: "CONTRACTOR" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Search + Filter */}
      <div className="w-[90vw] mx-auto mt-6 flex gap-6 items-center">
        {/* Filter */}
        <div className="w-[25%]">
          <label className="block mb-1 text-sm font-medium text-white">
            Filter by Job Type
          </label>

          <select
            value={jobType}
            onChange={(e) => {
              setJobType(e.target.value);
              setPage(1);
            }}
            className="w-full cursor-pointer border border-gray-300 bg-white px-3 py-2 rounded-md text-sm"
          >
            {jobTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="w-[75%] mt-6">
          <SearchBar
            onSearch={(value) => {
              setQuery(value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Job List */}
      <div className="w-[90vw] mx-auto mt-6">
        {loading && (
          <div className="flex justify-center items-center h-[50vh]">
            <GridLoader color="#ffffff" size={15} />
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && (
          <div className="grid gap-4 mt-4">
            {jobs.length > 0
              ? jobs.map((job) => <JobCard key={job.job_id} job={job} />)
              : !loading && (
                  <p className="text-sm text-gray-500">No jobs found.</p>
                )}
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="mt-10 pb-10">
            <Pagination page={page} setPage={setPage} setJobType={setJobType} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
