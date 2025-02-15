import React, { useState } from "react";
import { Trash, Pencil, Printer } from "heroicons-react";
import {
  JANITORS_DATA,
  DEFAULT_PROFILE_IMAGE,
} from "../../../data/placeholderData";

export default function Janitors() {
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10; // Fixed number of items per page

  // Improved search function with better fuzzy matching
  const searchJanitors = (data, term) => {
    if (!term.trim()) return data;

    const searchValue = term.toLowerCase();

    return data.filter((janitor) => {
      // Check each field individually for better matching
      const nameMatch = fuzzyMatch(janitor.name.toLowerCase(), searchValue);
      const idMatch = janitor.employeeId.toLowerCase().includes(searchValue);
      const emailMatch = janitor.email.toLowerCase().includes(searchValue);
      const contactMatch = janitor.contact.includes(searchValue);

      // Return true if any field matches
      return nameMatch || idMatch || emailMatch || contactMatch;
    });
  };

  // Improved fuzzy matching function
  const fuzzyMatch = (str, pattern) => {
    // Exact match check
    if (str.includes(pattern)) return true;

    // Convert strings to arrays for manipulation
    const strArr = str.split("");
    const patternArr = pattern.split("");

    // Initialize matrix for dynamic programming
    const matrix = Array(patternArr.length + 1)
      .fill()
      .map(() => Array(strArr.length + 1).fill(0));

    // Initialize first row and column
    for (let i = 0; i <= strArr.length; i++) {
      matrix[0][i] = i;
    }
    for (let i = 0; i <= patternArr.length; i++) {
      matrix[i][0] = i;
    }

    // Fill matrix
    for (let i = 1; i <= patternArr.length; i++) {
      for (let j = 1; j <= strArr.length; j++) {
        const cost = strArr[j - 1] === patternArr[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }

    // Get the minimum edit distance
    const distance = matrix[patternArr.length][strArr.length];

    // Calculate threshold based on pattern length
    const threshold = Math.floor(pattern.length * 0.4); // 40% tolerance

    // Return true if distance is within threshold
    return distance <= threshold;
  };

  const filteredJanitors = searchJanitors(JANITORS_DATA, searchTerm);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJanitors.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredJanitors.length / itemsPerPage);

  // Generate page numbers array dynamically
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="h-full flex flex-col shadow-md bg-white rounded-lg p-6">
      {/* Header - Search Bar and Generate Report Button */}
      <div className="flex flex-row justify-between shrink-0">
        {/* Search Bar */}
        <div className="relative w-1/2">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>

          <input
            type="text"
            id="Search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search name, ID, email, or contact"
            className="w-full rounded-lg border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm focus:border-Icpetgreen focus:ring-1 focus:ring-Icpetgreen"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
              type="button"
              className="text-Icpetgreen hover:text-gray-700"
            >
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        {/* Generate Report Button */}
        <div className="flex justify-end space-x-4 shrink-0">
          <button
            type="button"
            className="bg-Icpetgreen text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300 flex items-center gap-2 shadow-md"
          >
            Generate Report
          </button>
          <button
            type="button"
            className="bg-white px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300 flex items-center justify-center shadow-md"
          >
            <Printer className="w-5 h-5 text-Icpetgreen hover:text-white" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-6 shrink-0">
        <div className="sm:hidden">
          <label htmlFor="userTab" className="sr-only">
            User Tab
          </label>

          <select
            id="userTab"
            className="w-full rounded-md border-gray-200"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option>Basic Details</option>
            <option>Schedule</option>
            <option>Performance Task</option>
            <option>Resource Usage</option>
            <option>Logs and Report</option>
          </select>
        </div>

        <div className="hidden sm:block">
          <nav className="flex gap-6" aria-label="Tabs">
            {[
              "Basic Details",
              "Schedule",
              "Performance Task",
              "Resource Usage",
              "Logs and Report",
            ].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-lg w-32 p-2 text-sm font-medium text-center ${
                  activeTab === tab
                    ? "bg-Icpetgreen text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
                aria-current={activeTab === tab ? "page" : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Janitor Table Container */}
      <div className="mt-3 flex-1 flex flex-col h-full rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header - Fixed */}
        <div className="bg-gray-50">
          <table className="min-w-full table-fixed divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b-2 border-gray-200">
                <th className="w-16 py-4 text-center font-medium text-gray-900">
                  Profile
                </th>
                <th className="w-48 py-4 text-center font-medium text-gray-900">
                  Name
                </th>
                <th className="w-48 py-4 text-center font-medium text-gray-900">
                  Employee ID
                </th>
                <th className="w-72 py-4 text-center font-medium text-gray-900">
                  Employee Email
                </th>
                <th className="w-48 py-4 text-center font-medium text-gray-900">
                  Contact Information
                </th>
                <th className="w-32 py-4 text-center font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Table Body - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm table-fixed">
            <tbody className="divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((janitor) => (
                  <tr key={janitor.employeeId}>
                    <td className="w-16 py-4">
                      <div className="flex justify-center">
                        <img
                          src={janitor.image || DEFAULT_PROFILE_IMAGE}
                          alt={`${janitor.name}'s profile`}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="w-48 py-4 text-center text-gray-700">
                      <span className="font-medium text-gray-900">
                        {janitor.name}
                      </span>
                    </td>
                    <td className="w-48 py-4 text-center text-gray-700">
                      {janitor.employeeId}
                    </td>
                    <td className="w-72 py-4 text-center text-gray-700">
                      {janitor.email}
                    </td>
                    <td className="w-48 py-4 text-center text-gray-700">
                      {janitor.contact}
                    </td>
                    <td className="w-32 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="rounded-lg px-3 py-1 text-xs font-medium">
                          <Pencil className="w-4 h-4 text-Icpetgreen" />
                        </button>
                        <button className="rounded-lg px-3 py-1 text-xs font-medium">
                          <Trash className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-8">
                    No results found. Please try a different search term.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - Fixed at bottom */}
        <div className="shrink-0 rounded-b-lg border-t border-gray-200 px-4 py-2 bg-white">
          <ol className="flex justify-center gap-1 text-xs font-medium">
            <li>
              <button
                onClick={handlePrevPage}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white rtl:rotate-180 hover:bg-gray-50"
                disabled={currentPage === 1}
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>

            {pageNumbers.map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`h-8 w-8 rounded border ${
                    currentPage === page
                      ? "border-Icpetgreen bg-Icpetgreen text-white"
                      : "border-gray-100 bg-white text-gray-900 hover:bg-gray-50"
                  } text-center leading-8`}
                >
                  {page}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={handleNextPage}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white rtl:rotate-180 hover:bg-gray-50"
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
