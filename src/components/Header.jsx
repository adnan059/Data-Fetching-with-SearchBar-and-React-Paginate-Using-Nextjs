"use client";

import Link from "next/link";
import "../assets/styles/header.css";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link href={"/"}>
          My<span>Blogs</span>
        </Link>
      </div>
      <nav>
        <Link href={"/blogs"}>Blogs</Link>
      </nav>
    </header>
  );
};

export default Header;
