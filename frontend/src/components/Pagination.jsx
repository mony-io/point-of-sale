import React from "react";

const Pagination = (props) => {
    const {
        prevPageHandler,
        nextPageHandler,
        pages,
        currentPage,
        setCurrentPage,
        setTodosPerPage,
    } = props;

    return (
        <div className="flex mt-2 items-center">
            <span
                className="mr-1 cursor-pointer bg-transparent p-[3px] px-2 hover:bg-[#ddd]"
                onClick={prevPageHandler}
            >
                {"<<"}
            </span>
            <span className="text-md flex items-center p-2 ">
                {pages.map((page) => (
                    <span
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`${currentPage === page ? " text-blue-400 text-[16px]" : ""
                            } cursor-pointer bg-transparent mr-2 p-[3px] px-2 hover:bg-[#ddd]`}
                    >{`${page} `}</span>
                ))}
            </span>
            <span
                className="ml-1 cursor-pointer bg-transparent p-[3px] px-2 hover:bg-[#ddd]"
                onClick={nextPageHandler}
            >
                {">>"}
            </span>
        </div>
    );
};

export default Pagination;