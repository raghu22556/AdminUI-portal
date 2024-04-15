import React from "react";
import Navbar from "./Navbar";

const Index = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="font-bold ml-4 mt-6 lg:mt-0 lg:ml-4">Organization</h1>
      </div>

      <div className="flex flex-col items-center mt-6">
        <div className="text-center mt-8 shadow-sm rounded-lg border p-6 mx-4 sm:w-3/4 md:w-2/3  xl:w-1/3">
          <div>
            <p className="mt-4 text-sm">
              It seems like you haven't created an organization yet.
              Organizations are essential for managing your data, projects, and
              team collaboration efficiently. By creating an organization,
              you'll unlock a range of features and benefits
            </p>
            <button
              className="bg-blue-500  text-white py-1.5 px-4 rounded text-sm"
              style={{ marginTop: "40px" }}
            >
              Create Organization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
