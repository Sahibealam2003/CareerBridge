const JobCard = ({ job }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white/20 border border-gray-200 p-4 md:p-5 rounded-xl shadow-sm hover:shadow-lg transition duration-200">
      
      {/* Left Section */}
      <div className="w-full md:w-[40%] mb-4 md:mb-0">
        <h3 className="text-base sm:text-lg font-semibold text-red-50 leading-snug">
          {job.job_title || "Job Title Not Available"}
        </h3>

        <div className="flex flex-wrap items-center mt-1 gap-1">
          <p className="text-sm text-black">
            📍{job.employer_name || "Company Name"},
          </p>
          <p className="text-sm text-gray-900">
            {job.job_city || "Location not specified"}
          </p>
        </div>

        <span className="inline-block mt-2 text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
          {job.job_employment_type || "N/A"}
        </span>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[40%] flex md:flex-col items-center md:justify-center md:items-end justify-between">
        {job.job_posted_at ? (
          <p className="text-xs sm:text-sm text-black mb-3 md:mb-4">
            Posted {job.job_posted_at}
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-center text-red-500 mb-3 md:mb-4">
            Job Expire
          </p>
        )}

        <a
          href={job.job_google_link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-xs sm:text-sm border font-semibold text-white rounded-lg hover:bg-blue-800 transition text-center"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobCard;
