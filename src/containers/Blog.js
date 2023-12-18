import React from "react";
import ReactMarkdown from "react-markdown";
import NavBar from "../components/NavBar";

const Blog = () => {
  return (
    <div className="flex flex-col m-8 space-y-4">
      <NavBar />
      <div className="pt-10">
        <ReactMarkdown>*React-Markdown* is **Awesome**</ReactMarkdown>
      </div>
    </div>
  );
};

export default Blog;
