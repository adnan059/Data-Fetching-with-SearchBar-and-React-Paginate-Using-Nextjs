import AllBlogs from "@/components/AllBlogs";
import "@/assets/styles/blogs.css";
import { baseUrl } from "@/utils/data";

async function fetchBlogs(search = "", page = 1, limit = 3) {
  const res = await fetch(
    `${baseUrl}/api/blogs?search=${search}&page=${page}&limit=${limit}`,
    { cache: "no-store" } // Ensures fresh data
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
}

export default async function BlogsPage() {
  const initialData = await fetchBlogs();
  return (
    <div className="blogs">
      <h2>All Published Blogs</h2>
      <AllBlogs initialData={initialData} />
    </div>
  );
}
