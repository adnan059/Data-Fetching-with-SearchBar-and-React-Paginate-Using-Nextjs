import { Blog } from "@/models/models";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const {
      search = "",
      page = 1,
      limit = 3,
    } = Object.fromEntries(new URL(req.url).searchParams.entries());

    const skip = (parseInt(page) - 1) * parseInt(limit);

    await connectDB();

    // Fetch blogs with optional search
    const blogs = await Blog.find(
      search ? { title: { $regex: search, $options: "i" } } : {}
    )
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(
      search ? { title: { $regex: search, $options: "i" } } : {}
    );

    return NextResponse.json(
      {
        blogs,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "failed to fetch the posts" },
      { status: 500 }
    );
  }
}
