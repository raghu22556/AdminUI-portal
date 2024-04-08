const Cards = () => {
  return (
    <div className="flex flex-wrap justify-between mt-6">
      <div className="w-full md:w-[calc(25%-0.75rem)] sm:w-[calc(50%-0.75rem)] bg-[#95A4FC] rounded-2xl p-2 sm:p-4 mb-2 md:mb-0">
        <p className="text-[10px] sm:text-[12px]">Schedule TODO</p>
        <h1 className="font-bold text-sm sm:text-2xl">100</h1>
      </div>
      <div className="w-full md:w-[calc(25%-0.75rem)] sm:w-[calc(50%-0.75rem)] bg-[#C6C7F8] rounded-2xl p-2 sm:p-4 mb-2 md:mb-0">
        <p className="text-[10px] sm:text-[12px]">Project</p>
        <h1 className="font-bold text-sm sm:text-2xl">35</h1>
      </div>
      <div className="w-full md:w-[calc(25%-0.75rem)] sm:w-[calc(50%-0.75rem)] bg-[#A8C5DA] rounded-2xl p-2 sm:p-4 mb-2 md:mb-0">
        <p className="text-[10px] sm:text-[12px]">Users</p>
        <h1 className="font-bold text-sm sm:text-2xl">1,156</h1>
      </div>
      <div className="w-full md:w-[calc(25%-0.75rem)] sm:w-[calc(50%-0.75rem)] bg-[#B1E3FF] rounded-2xl p-2 sm:p-4 mb-2 md:mb-0">
        <p className="text-[10px] sm:text-[12px]">Complaints</p>
        <h1 className="font-bold text-sm sm:text-2xl">25</h1>
      </div>
    </div>
  );
};

export default Cards;
