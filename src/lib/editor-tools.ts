"use client";



export const getEditorTools = async (startUpload: (files: File[]) => Promise<unknown>) => {

  const Embed = (await import("@editorjs/embed")).default;
  const Table = (await import("@editorjs/table")).default;
  const List = (await import("@editorjs/list")).default;
  const Code = (await import("@editorjs/code")).default;
  const LinkTool = (await import("@editorjs/link")).default;
  const InlineCode = (await import("@editorjs/inline-code")).default;
  const Header = (await import("@editorjs/header")).default;
  const ImageTool = (await import("@editorjs/image")).default;


  return {
    header: Header,
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: "/api/link", 
      },
    },
    image: {
      class: ImageTool,
      config: {
        uploader: {
          async uploadByFile(file: File) {
         
            const res = await startUpload([file]);
            if (!res) {
            
              console.error("Image upload failed.");
              return { success: 0 };
            }
            return {
              success: 1,
             
            };
          },
        },
      },
    },
    list: List,
    code: Code,
    inlineCode: InlineCode,
    table: Table,
    embed: Embed,
  };
};