"use client";
import Link from "next/link";
import "../assets/styles/blogsTable.css";
import FI from "feather-icons-react";

import { useEffect, useState } from "react";

const BlogsTable = ({ blogs }) => {
  const [allBlogs, setAllBlogs] = useState(blogs);

  useEffect(() => {
    setAllBlogs(blogs);
  }, [blogs]);

  return (
    <div>
      <table className="blogsTable">
        <thead>
          <tr>
            <td>#</td>
            <td>Title</td>
            <td>Description</td>
            <td>Edit / Delete</td>
          </tr>
        </thead>
        <tbody>
          {allBlogs?.length > 0 ? (
            <>
              {allBlogs?.map((blog, i) => (
                <tr key={blog?._id}>
                  <td>{i + 1}</td>
                  <td>{blog?.title}</td>
                  <td>{blog?.desc.slice(0, 10)}...</td>
                  <td className="viewDel">
                    <Link href={`/blogs/${blog?._id}`}>
                      <FI icon="edit" />
                    </Link>
                    <form action="">
                      <input type="hidden" name="_id" value={blog?._id} />
                      <button type="submit">
                        <FI fill="red" icon="trash-2" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={4}>No Blog Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsTable;
