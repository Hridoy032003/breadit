"use client";

import React from "react";
import Image from "next/image";
// Import OutputData for the type cast after validation
import { OutputData, OutputBlockData } from "@editorjs/editorjs";

interface EditorOutputProps {
  // 👇 THE FIX IS HERE 👇
  // Use 'unknown' instead of 'any'. This is the type-safe way to represent
  // a value whose type is not known at compile time.
  content: unknown;
}

const EditorOutput = ({ content }: EditorOutputProps) => {
  // This validation logic now serves as a "type guard". It proves to TypeScript
  // that 'content' has the shape we expect before we try to use it.
  const isContentValid =
    content &&
    typeof content === "object" &&
    "blocks" in content && // Check that the 'blocks' key exists
    (content as { blocks: unknown }).blocks &&
    Array.isArray((content as { blocks: unknown }).blocks);

  if (!isContentValid) {
    // If the 'unknown' content fails validation, we render nothing.
    return null;
  }

  // After the check, we can safely cast the content to the type we need.
  const validContent = content as OutputData;

  return (
    <div className="text-sm prose prose-stone dark:prose-invert max-w-full">
      {/* We map over the now-validated 'validContent' */}
      {validContent.blocks.map((block: OutputBlockData, index: number) => {
        switch (block.type) {
          case "header":
            switch (block.data.level) {
              case 1:
                return <h1 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }}></h1>;
              case 2:
                return <h2 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }}></h2>;
              case 3:
                return <h3 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }}></h3>;
              case 4:
                return <h4 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }}></h4>;
              case 5:
                return <h5 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }}></h5>;
              case 6:
                return <h6 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }}></h6>;
              default:
                return <h6 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }}></h6>;
            }

          case "paragraph":
            return (
              <p key={index} dangerouslySetInnerHTML={{ __html: block.data.text }}></p>
            );

          case "list":
            const ListTag = block.data.style === "ordered" ? "ol" : "ul";
            return (
              <ListTag key={index}>
                {block.data.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }}></li>
                ))}
              </ListTag>
            );

          case "image":
            return (
              <div key={index} className="relative w-full min-h-[15rem]">
                <Image
                  src={block.data.file.url}
                  alt={block.data.caption || "Post image"}
                  className="object-contain"
                  fill
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default EditorOutput;