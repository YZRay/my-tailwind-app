import { useState } from "react";

const Pagination = (props) => {
  const { totalPage, onPageChange } = props;
  const [selectedPage, setSelectedPage] = useState(1);

  const maxDisplayedPages = 10; // 最多顯示的頁碼數量
  const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);

  const pageNumbers = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );

  let displayedPageNumbers = [];

  // 判斷是否顯示部分頁碼
  if (totalPage > maxDisplayedPages) {
    if (selectedPage <= halfMaxDisplayedPages) {
      displayedPageNumbers = pageNumbers.slice(0, maxDisplayedPages);
    } else if (selectedPage >= totalPage - halfMaxDisplayedPages) {
      // 當選取頁碼到最大顯示頁碼一半時生成後面的頁碼
      displayedPageNumbers = pageNumbers.slice(
        totalPage - maxDisplayedPages,
        totalPage
      );
    } else {
      displayedPageNumbers = pageNumbers.slice(
        selectedPage - halfMaxDisplayedPages - 1,
        selectedPage + halfMaxDisplayedPages
      );
    }
  } else {
    displayedPageNumbers = pageNumbers;
  }

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
    setSelectedPage(pageNumber);
  };
  // 上一頁
  const handlePrevPage = () => {
    if (selectedPage > 1) {
      const prevPage = selectedPage - 1;
      setSelectedPage(prevPage);
      onPageChange(prevPage);
    }
  };
  // 下一頁
  const handleNextPage = () => {
    if (selectedPage < totalPage) {
      const nextPage = selectedPage + 1;
      setSelectedPage(nextPage);
      onPageChange(nextPage);
    }
  };
  //   判斷是否在第一頁或最後一頁
  const isPrevDisabled = selectedPage === 1;
  const isNextDisabled = selectedPage === totalPage;

  //   生成頁碼
  const pageList = displayedPageNumbers.map((pageNumber) => (
    <li
      key={pageNumber}
      className={` cursor-pointer w-7 h-7 border border-solid border-slate-300 text-center hover:bg-slate-500 hover:text-white ${
        selectedPage === pageNumber ? "bg-slate-500 text-white" : ""
      }`}
      onClick={() => handlePageClick(pageNumber)}
    >
      {pageNumber}
    </li>
  ));

  return (
    <div className="flex  w-full place-content-around items-start p-16">
      <ul className="list-none p-0 m-0 flex">
        <li
          className={`cursor-pointer w-auto h-7 border border-solid border-slate-300 text-center mr-8 px-2 hover:bg-slate-500 hover:text-white ${
            isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevPage}
        >
          上一頁
        </li>
        {pageList}
        <li
          className={`cursor-pointer w-auto h-7 border border-solid border-slate-300 text-center ml-8 px-2 hover:bg-slate-500 hover:text-white ${
            isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
        >
          下一頁
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
