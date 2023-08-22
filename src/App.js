import Card from "./components/Card";
import Pagination from "./components/Pagination";
import { useState } from "react";

function App() {
  const [selectedPage, setSelectedPage] = useState(1); // 初始選取第一頁

  const handlePageChange = (pageNumber) => {
    setSelectedPage(pageNumber);
  };

  return (
    <div className="bg-gray-100 p-16 flex flex-col">
      <h1 className="font-black text-center text-blue-950 text-5xl p-8 pb-32">
        List of Rick and Morty characters
      </h1>
      <Card selectedPage={selectedPage} />
      <Pagination totalPage={42} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
