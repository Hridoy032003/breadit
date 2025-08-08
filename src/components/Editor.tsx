"use client";

import EditorJS, { OutputData } from "@editorjs/editorjs"; // Import OutputData
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "../app/editor.css";
import { getEditorTools } from "@/lib/editor-tools";

// This Zod schema is for the form fields that react-hook-form will manage.
const PostFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  // We don't include content here because it's managed by EditorJS, not the form state.
});

// This interface defines the final payload we will send to our API.
interface PostCreationPayload {
  title: string;
  content: OutputData; // Use the correct type from EditorJS.
  subredditId: string;
}

// Infer the type for our form data from the form-specific Zod schema.
type FormData = z.infer<typeof PostFormSchema>;

interface EditorProps {
  subredditId: string;
}

const Editor: React.FC<EditorProps> = ({ subredditId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const ref = useRef<EditorJS | null>(null);
  const _titleRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const { mutate: createPost } = useMutation({
    // The mutation function expects the clean, final payload.
    mutationFn: async (payload: PostCreationPayload) => {
      const { data } = await axios.post(
        "/api/subreddit/post/createPost",
        payload
      );
      return data;
    },
    onError: (error) => {
      console.log("Error creating post:", error);
      toast.error("There was an error creating your post. Please try again.");
    },
    onSuccess: () => {
      const newPathname = pathname.split("/").slice(0, -1).join("/");
      router.push(newPathname);
      router.refresh();
      toast.success("Post created successfully!");
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const startUpload = async () => {
      //  const res = await uploadFiles(files, "imageUploader");
      //  return res;
    };

    const tools = await getEditorTools(startUpload);

    if (!ref.current) {
      ref.current = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = ref.current;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools,
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [, value] of Object.entries(errors)) {
        toast.error((value as { message: string }).message);
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
      setTimeout(() => _titleRef?.current?.focus(), 0);
    };
    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = null;
      };
    }
  }, [isMounted, initializeEditor]);

  // The onSubmit function receives data from the form (just the title).
  const onSubmit = async (data: FormData) => {
    const content = await ref.current?.save();

    if (!content || content.blocks.length === 0) {
      return toast.error("Content cannot be empty.");
    }

    // We now construct the final payload using data from the form and from the editor.
    const payload: PostCreationPayload = {
      title: data.title,
      content: content, // 'content' is now of type OutputData.
      subredditId,
    };

    createPost(payload);
  };

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form
        id="subreddit-post-form"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Editor;
