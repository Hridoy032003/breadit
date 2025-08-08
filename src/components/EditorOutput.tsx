"use-client";

import React from "react";
// 👇 CHANGE #1: Import the official types from the library
import { OutputData } from "@editorjs/editorjs";

// We no longer need the manually created 'contentType' and 'block' interfaces.

// 👇 CHANGE #2: Use the official 'OutputData' type for the content prop.
const EditorOutput = ({ content }: { content: OutputData }) => {
  return (
    <div className="text-sm prose prose-stone dark:prose-invert max-w-full">
      {/* 👇 CHANGE #3: Let TypeScript infer the correct 'block' type (OutputBlockData)
          and use the 'index' as a reliable key. */}
      {content.blocks.map((block, index) => {
        // Here, 'block' is correctly typed as 'OutputBlockData'
        switch (block.type) {
          case "header":
            const HeaderTag =
              `h${block.data.level}`;
            return (
              // Use index for the key
              <HeaderTag
                key={index}
               
              ></HeaderTag>
            );

          case "paragraph":
            return (
              // Use index for the key
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              ></p>
            );

          case "list":
            // This logic is correct for the standard list tool
            const ListTag = block.data.style === "ordered" ? "ol" : "ul";
            return (
              // Use index for the key
              <ListTag key={index}>
                {block.data.items.map((item: string, itemIndex: number) => (
                  <li
                    key={itemIndex} // Use a nested index for the inner list
                    dangerouslySetInnerHTML={{ __html: item }}
                  ></li>
                ))}
              </ListTag>
            );

          // Add a case for rendering images if your editor supports it
         
          default:
            // Return null for any unsupported block types
            return null;
        }
      })}
    </div>
  );
};

export default EditorOutput;
