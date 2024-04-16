import { useState } from "react";
import Navbar from "./Navbar";
import Modal from "./Modal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="font-bold lg:text-left text-center  mt-4 lg:mt-0 lg:ml-4 md:mt-12 xl:mt-8 font-poppins">
          Organization
        </h1>
      </div>

      <div className="flex flex-col items-center mt-6">
        <div className="text-center mt-8 shadow-sm rounded-lg border p-6 mx-4 sm:w-3/4 md:w-2/3">
          <div>
            <p className="mt-4 text-sm font-poppins">
              It seems like you haven't created an organization yet.
              Organizations are essential for managing your data, projects, and
              team collaboration efficiently. By creating an organization,
              you'll unlock a range of features and benefits
            </p>
            <button
              className="bg-blue-500 text-white py-1.5 px-4 rounded text-sm font-poppins"
              style={{ marginTop: "40px" }}
              onClick={toggleModal}
            >
              Create Organization
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        title="Create Organization"
      ></Modal>
    </div>
  );
};

export default Index;
