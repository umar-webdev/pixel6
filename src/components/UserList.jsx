import React, { useEffect, useState } from "react";
import filter from "../assets/filter-svgrepo-com.svg";
import sort from "../assets/up-down-arrow-svgrepo-com.svg";
import "../App.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [genderFilter, setGenderFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
//Getting User Data 
  const fetchUser = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.log("Not fetching Data", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
// Sort User By Name and ID
  const handleSort = (field) => {
    const isSameField = sortField === field;
    const isAscending = sortOrder === "asc";
    const shouldToggleOrder = isSameField && isAscending;
    const order = shouldToggleOrder ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedUsers = [...users].sort((a, b) => {
    let fieldA, fieldB;

    if (sortField === "fullName") {
      fieldA = `${a.firstName} ${a.maidenName || ""} ${
        a.lastName
      }`.toLowerCase();
      fieldB = `${b.firstName} ${b.maidenName || ""} ${
        b.lastName
      }`.toLowerCase();
    } else {
      fieldA = a[sortField];
      fieldB = b[sortField];

      if (typeof fieldA === "string") fieldA = fieldA.toLowerCase();
      if (typeof fieldB === "string") fieldB = fieldB.toLowerCase();
    }

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
 // Filter Users by Gender and Country
  const handleGenderFilterChange = (e) => {
    setGenderFilter(e.target.value);
  };

  const handleCountryFilterChange = (e) => {
    setCountryFilter(e.target.value);
  };

  const filteredUsers = sortedUsers.filter((user) => {
    return (
      (genderFilter === "" || user.gender === genderFilter) &&
      (countryFilter === "" || user.address.country === countryFilter)
    );
  });

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Employees</h1>
        </div>
        <div className="flex space-x-4 mb-4">
          <img src={filter} alt="Filter" height={25} width={25} />
          <select
            id="countries"
            className="custom-select mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleCountryFilterChange}
            defaultValue=""
          >
            <option value="">Country</option>
            <option value="United States">US</option>
            <option value="Canada">CA</option>
          </select>
          <select
            id="gender"
            className="custom-select block w-full p-2 mb-4 mt-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleGenderFilterChange}
            defaultValue=""
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="border-slate-200 border rounded-3xl">
        <table className="border-collapse min-w-full block md:table">
          <thead className="block md:table-header-group">
            <tr className="border-b block md:table-row">
              <th className="p-2 text-left block md:table-cell">
                ID{" "}
                <button onClick={() => handleSort("id")}>
                  <img src={sort} alt="Sort" />
                </button>
              </th>
              <th className="p-2 text-left block md:table-cell">Image</th>
              <th className="p-2 text-left block md:table-cell">
                Full Name{" "}
                <button onClick={() => handleSort("fullName")}>
                  <img src={sort} alt="Sort" />
                </button>
              </th>
              <th className="p-2 text-left block md:table-cell">Demography</th>
              <th className="p-2 text-left block md:table-cell">Designation</th>
              <th className="p-2 text-left block md:table-cell">Location</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b block md:table-row">
                <td className="p-2 block md:table-cell text-left">{user.id}</td>
                <td className="p-2 block md:table-cell">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-2 block md:table-cell text-left">{`${
                  user.firstName
                } ${user.maidenName || ""} ${user.lastName}`}</td>
                <td className="p-2 block md:table-cell text-left">{`${
                  user.gender === "male" ? "M" : "F"
                }/${user.age}`}</td>
                <td className="p-2 block md:table-cell text-left">
                  {user.company?.title || "N/A"}
                </td>
                <td className="p-2 block md:table-cell text-left">{`${
                  user.address?.state || "N/A"
                }, ${
                  user.address?.country === "United States" ? "US" : "N/A"
                }`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
