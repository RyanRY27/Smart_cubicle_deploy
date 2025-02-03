import React, { useState } from "react";

export default function Users() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9; // Set to show 9 items per page
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Sample data for Users
  const USERS_DATA = [
    {
      name: "Isabella Cruz",
      employeeId: "TUPM-22-0001",
      email: "isabella.cruz@tup.edu.ph",
      contact: "+639111222333",
      position: "Janitor",
      priority: true,
      status: "Pending",
    },
    {
      name: "Rafael Mendoza",
      employeeId: "TUPM-22-0002",
      email: "rafael.mendoza@tup.edu.ph",
      contact: "+639222333444",
      position: "Maintenance",
      priority: false,
      status: "Declined",
    },
    {
      name: "Carmen Ramos",
      employeeId: "TUPM-22-0003",
      email: "carmen.ramos@tup.edu.ph",
      contact: "+639333444555",
      position: "Janitor",
      priority: true,
      status: "Accepted",
    },
    {
      name: "Antonio Santos",
      employeeId: "TUPM-22-0004",
      email: "antonio.santos@tup.edu.ph",
      contact: "+639444555666",
      position: "Security",
      priority: false,
      status: "Pending",
    },
    {
      name: "Beatriz Luna",
      employeeId: "TUPM-22-0005",
      email: "beatriz.luna@tup.edu.ph",
      contact: "+639555666777",
      position: "Janitor",
      priority: true,
      status: "Pending",
    },
    {
      name: "Gabriel Reyes",
      employeeId: "TUPM-22-0006",
      email: "gabriel.reyes@tup.edu.ph",
      contact: "+639666777888",
      position: "Maintenance",
      priority: false,
      status: "Pending",
    },
    {
      name: "Maria Gonzales",
      employeeId: "TUPM-21-0007",
      email: "maria.gonzales@tup.edu.ph",
      contact: "+639777888999",
      position: "Security",
      priority: false,
      status: "Accepted",
    },
    {
      name: "Juan dela Cruz",
      employeeId: "TUPM-21-0001",
      email: "juan.delacruz@tup.edu.ph",
      contact: "+639111222333",
      position: "Janitor",
      priority: true,
      status: "Accepted",
    },
    {
      name: "Isabella Cruz",
      employeeId: "TUPM-21-0008",
      email: "isabella.cruz@tup.edu.ph",
      contact: "+639888999000",
      position: "Security",
      priority: false,
      status: "Accepted",
    },
    {
      name: "Roberto Santos",
      employeeId: "TUPM-22-0008",
      email: "roberto.santos@tup.edu.ph",
      contact: "+639888999000",
      position: "Maintenance",
      priority: true,
      status: "Accepted",
    },
    {
      name: "Teresa Luna",
      employeeId: "TUPM-22-0009",
      email: "teresa.luna@tup.edu.ph",
      contact: "+639999000111",
      position: "Janitor",
      priority: false,
      status: "Accepted",
    },
    {
      name: "Carlos Reyes",
      employeeId: "TUPM-22-0010",
      email: "carlos.reyes@tup.edu.ph",
      contact: "+639000111222",
      position: "Security",
      priority: true,
      status: "Accepted",
    },
    {
      name: "Beatriz Garcia",
      employeeId: "TUPM-22-0011",
      email: "beatriz.garcia@tup.edu.ph",
      contact: "+639111222333",
      position: "Maintenance",
      priority: false,
      status: "Pending",
    },
    {
      name: "Manuel Torres",
      employeeId: "TUPM-22-0012",
      email: "manuel.torres@tup.edu.ph",
      contact: "+639222333444",
      position: "Janitor",
      priority: true,
      status: "Accepted",
    },
    {
      name: "Lucia Mendoza",
      employeeId: "TUPM-22-0013",
      email: "lucia.mendoza@tup.edu.ph",
      contact: "+639333444555",
      position: "Security",
      priority: false,
      status: "Pending",
    },
    {
      name: "Felipe Cruz",
      employeeId: "TUPM-22-0014",
      email: "felipe.cruz@tup.edu.ph",
      contact: "+639444555666",
      position: "Maintenance",
      priority: true,
      status: "Pending",
    },
    {
      name: "Rosa Santos",
      employeeId: "TUPM-22-0015",
      email: "rosa.santos@tup.edu.ph",
      contact: "+639555666777",
      position: "Janitor",
      priority: false,
      status: "Declined",
    },
  ];

  // Improved search function with fuzzy matching
  const searchUsers = (data, term) => {
    if (!term.trim()) return data;

    const searchValue = term.toLowerCase();

    return data.filter((user) => {
      // Check each field individually for better matching
      const nameMatch = fuzzyMatch(user.name.toLowerCase(), searchValue);
      const idMatch = user.employeeId.toLowerCase().includes(searchValue);
      const emailMatch = user.email.toLowerCase().includes(searchValue);
      const contactMatch = user.contact.includes(searchValue);
      const positionMatch = user.position.toLowerCase().includes(searchValue);

      // Return true if any field matches
      return (
        nameMatch || idMatch || emailMatch || contactMatch || positionMatch
      );
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

  // Filter users based on active tab and search term
  const filterUsersByTab = (users) => {
    switch (activeTab) {
      case "Requests":
        return users.filter((user) => user.status === "Pending");
      case "Accepted":
        return users.filter((user) => user.status === "Accepted");
      case "Declined":
        return users.filter((user) => user.status === "Declined");
      default: // "All" tab
        return users;
    }
  };

  // Apply both search and tab filters
  const filteredUsers = filterUsersByTab(searchUsers(USERS_DATA, searchTerm));

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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

  const handleAccept = (employeeId) => {
    // Update user status logic here
    console.log(`Accepted user ${employeeId}`);
  };

  const handleDecline = (employeeId) => {
    // Update user status logic here
    console.log(`Declined user ${employeeId}`);
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      // Select all items currently visible on the page
      const currentIds = currentItems.map((user) => user.employeeId);
      setSelectedItems(currentIds);
    } else {
      // Deselect all items
      setSelectedItems([]);
    }
  };

  // Handle individual item selection
  const handleSelectItem = (employeeId) => {
    setSelectedItems((prev) => {
      if (prev.includes(employeeId)) {
        // Remove item if already selected
        const newSelected = prev.filter((id) => id !== employeeId);
        // Update selectAll state
        setSelectAll(newSelected.length === currentItems.length);
        return newSelected;
      } else {
        // Add item if not selected
        const newSelected = [...prev, employeeId];
        // Update selectAll state
        setSelectAll(newSelected.length === currentItems.length);
        return newSelected;
      }
    });
  };

  // Reset pagination when changing tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
    setSelectedItems([]); // Clear selected items
    setSelectAll(false); // Reset select all checkbox
  };

  return (
    <div className="h-full shadow-md bg-white rounded-lg p-6">
      {/* Header - Navigation and Search Bar */}
      <div className="flex flex-row justify-between">
        {/* Tab Navigation */}
        <div>
          <div className="sm:hidden">
            <label htmlFor="userTab" className="sr-only">
              User Tab
            </label>
            <select
              id="userTab"
              className="w-full rounded-md border-gray-200"
              value={activeTab}
              onChange={(e) => handleTabChange(e.target.value)}
            >
              <option>All</option>
              <option>Requests</option>
              <option>Accepted</option>
              <option>Declined</option>
            </select>
          </div>

          <div className="hidden sm:block">
            <nav className="flex gap-6" aria-label="Tabs">
              {["All", "Requests", "Accepted", "Declined"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`shrink-0 rounded-lg w-24 p-2 text-sm font-medium text-center ${
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
        {/* Search Bar */}
        <div className="relative w-64">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>

          <input
            type="text"
            id="Search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search name, ID, position, etc."
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
      </div>

      {/* User Table */}
      <div className="mt-3 rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-12 px-4 py-4">
                  <label className="sr-only">Select All</label>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-Icpetgreen focus:ring-Icpetgreen"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="w-12 px-4 py-4">
                  <span className="sr-only">Priority</span>
                </th>
                <th className="w-48 px-4 py-4 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="px-4 py-4 text-left font-medium text-gray-900">
                  Employee ID
                </th>
                <th className="px-4 py-4 text-left font-medium text-gray-900">
                  Employee Email
                </th>
                <th className="px-4 py-4 text-left font-medium text-gray-900">
                  Contact Information
                </th>
                <th className="px-4 py-4 text-left font-medium text-gray-900">
                  Position
                </th>
                <th className="px-4 py-4 text-left font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <tr key={user.employeeId}>
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-Icpetgreen focus:ring-Icpetgreen"
                        checked={selectedItems.includes(user.employeeId)}
                        onChange={() => handleSelectItem(user.employeeId)}
                      />
                    </td>
                    <td className="px-4 py-4">
                      {user.priority && <span className="text-red-500">!</span>}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="/images/sadGato.jpg"
                          alt="User"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-700">
                      {user.employeeId}
                    </td>
                    <td className="px-4 py-4 text-gray-700">{user.email}</td>
                    <td className="px-4 py-4 text-gray-700">{user.contact}</td>
                    <td className="px-4 py-4 text-gray-700">{user.position}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        {user.status === "Pending" ? (
                          // Show Accept/Decline buttons for Pending status
                          <>
                            <button
                              className="rounded-lg bg-Icpetgreen px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
                              onClick={() => handleAccept(user.employeeId)}
                            >
                              Accept
                            </button>
                            <button
                              className="rounded-lg border border-red-500 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white"
                              onClick={() => handleDecline(user.employeeId)}
                            >
                              Decline
                            </button>
                          </>
                        ) : (
                          // Show status indicator for Accepted/Declined
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "Accepted"
                                ? "text-Icpetgreen bg-green-50"
                                : "text-red-500 bg-red-50"
                            }`}
                          >
                            {user.status}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No results found. Please try a different search term.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
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
