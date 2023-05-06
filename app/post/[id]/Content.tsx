"use client";
import { FormattedPostType } from "@/app/types";
import React, { useState } from "react";
import Image from "next/image";
import SocialLinks from "@/app/(shared)/SocialLinks";
import { useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CategoryAndEdit from "./CategoryAndEdit";
import Article from "./Article";

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

  const date = new Date(post?.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-Us", options);

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
    editorProps: {
      attributes: {
        class:
          "prose prose-sm xl:prose-2xl leading-8 focus:outline-none w-full max-w-full",
      },
    },
    content: content,
    editable: isEditable,
  });

  const handleIsEditable = (check: boolean) => {
    setIsEditable(check);
    editor?.setEditable(check);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //validation checks
    if (title === "") setTitleError("This field is required.");
    if (editor?.isEmpty) setContentError("This field is required.");
    if (title === "" || editor?.isEmpty) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/post/${post?.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      }
    );
    const data = await response.json();
    handleIsEditable(false);
    setPrevTitle("");
    setPrevContent("");
    setTitle(data.title);
    setContent(data.content);
    editor?.commands.setContent(data.content);
  };

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
              {titleError && (
                <p className="mt-1 text-accent-red">{titleError}</p>
              )}
            </div>
          ) : (
            <h3 className="font-bold text-3xl mt-3">{title}</h3>
          )}
          <div className="flex gap-3">
            <h5 className="font-semibold text-xs">By {post.author}</h5>
            <h6 className="text-wh-300 text-xs"> {formattedDate}</h6>
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
        <Article
          contentError={contentError}
          editor={editor}
          isEditable={isEditable}
          setContent={setContent}
          title={title}
        />
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
