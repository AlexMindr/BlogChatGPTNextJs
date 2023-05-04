"use client";
import { FormattedPostType } from "@/app/types";
import React, { useState } from "react";

import Image from "next/image";
import SocialLinks from "@/app/(shared)/SocialLinks";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./EditorMenuBar";
import CategoryAndEdit from "./CategoryAndEdit";

type Props = {
  post: FormattedPostType;
};

const Content = ({ post }: Props) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(post.title);
  const [titleError, setTitleError] = useState<string>("");
  const [prevTitle, setPrevTitle] = useState<string>(title);

  const [content, setContent] = useState<string>(post.content);
  const [contentError, setContentError] = useState<string>("");
  const [prevContent, setPrevContent] = useState<string>(content);

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (title) setTitle("");
    setTitle(e.target.value);
  };

  const handleOnChangeContent = ({ editor }: any) => {
    if (!(editor as Editor).isEmpty) setContentError("");
    setContent((editor as Editor).getHTML());
  };

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: handleOnChangeContent,
    content: content,
    editable: isEditable,
  });

  const handleIsEditable = (check: boolean) => {
    setIsEditable(check);
    editor?.setEditable(check);
  };

  const handleSubmit = () => {};

  return (
    <div className="prose w-full max-w-full mb-10">
      {/* Breadcrumbs */}
      <h5 className="text-wh-300">{`Home > ${post.category} > ${post.title}`}</h5>
      {/* Category and edit */}
      <CategoryAndEdit
        isEditable={isEditable}
        handleIsEditable={handleIsEditable}
        title={title}
        setTitle={setTitle}
        prevTitle={prevTitle}
        setPrevTitle={setPrevTitle}
        prevContent={prevContent}
        setPrevContent={setPrevContent}
        editor={editor}
        post={post}
      />
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <>
          {isEditable ? (
            <div>
              <textarea
                className="border-2 rounded-md bg-wh-50 p-3 w-full"
                placeholder="Title"
                onChange={handleOnChangeTitle}
                value={title}
              />
            </div>
          ) : (
            <h3 className="font-bold text-3xl mt-3">{title}</h3>
          )}
          <div className="flex gap-3">
            <h5 className="font-semibold text-xs">By {post.author}</h5>
            <h6 className="text-wh-300 text-xs"> {post.createdAt}</h6>
          </div>
        </>
        {/* Image */}
        <div className="relative w-auto mt-2 mb-16 h-96">
          <Image
            fill
            alt={`${post.title}`}
            src={post.image}
            sizes="(max-width:480px) 100vw,
                 (max-width:768px) 85vw,
                 (max-width:1060px) 75vw,
                 60vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* Editor */}
        <div
          className={
            isEditable
              ? "border-2 rounded-md bg-wh-50 p-3"
              : "w-full max-w-full"
          }
        >
          {isEditable && (
            <>
              <EditorMenuBar editor={editor} />
              <hr className="border mt-2 mb-5" />
            </>
          )}
          <EditorContent editor={editor} />
        </div>
        {/* Submit button */}
        {isEditable && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5"
            >
              SUBMIT
            </button>
          </div>
        )}
      </form>
      {/* Social links */}
      <div className="hidden md:block mt-10 w-1/3">
        <SocialLinks isDark />
      </div>
    </div>
  );
};

export default Content;
