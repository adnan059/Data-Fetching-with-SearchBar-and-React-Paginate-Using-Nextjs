"use client";

import ReactPaginate from "react-paginate";
import BlogsTable from "./BlogsTable";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils/data";

// all blogs component
const AllBlogs = ({ initialData }) => {
  const [blogs, setBlogs] = useState(initialData.blogs || []);
  const [totalPages, setTotalPages] = useState(
    Math.ceil((initialData.total || 0) / initialData.limit)
  );
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 800);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchFilteredBlogs() {
      try {
        const res = await fetch(
          `${baseUrl}/api/blogs?search=${debouncedSearch}&page=${
            currentPage + 1
          }&limit=3`
        );
        const data = await res.json();
        setBlogs(data.blogs);
        setTotalPages(Math.ceil(data.total / 3));
      } catch (error) {
        throw new Error(error?.message || "failed to fetch posts");
      }
    }

    fetchFilteredBlogs();
  }, [debouncedSearch, currentPage]);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchInput"
      />

      <BlogsTable blogs={blogs} />

      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="pagination flex justify-center mt-4"
        activeClassName="bg-blue-500 text-white"
        previousLabel="&laquo;"
        nextLabel="&raquo;"
        breakLabel="..."
        pageClassName="pagination"
      />
    </div>
  );
};

export default AllBlogs;
