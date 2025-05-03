import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostListResponse } from "../pages/Dashboard";
import { updatePost } from "../api/api-service";

interface ModalEditProps {
  postId: number;
  initialTitle: string;
  initialContent: string;
  currentPageUrl: string;
}

export default function ModalEdit({
  postId,
  initialTitle,
  initialContent,
  currentPageUrl
}: ModalEditProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const queryClient = useQueryClient();

  function openModal() {
    modalRef.current?.showModal();
  }

  function closeModal() {
    modalRef.current?.close();
  }

  const updateMutation = useMutation({
    mutationFn: ({ id, title, content }: { id: number; title: string; content: string }) => 
      updatePost(id, { title, content }),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<PostListResponse>(["posts", currentPageUrl], (oldData) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          results: oldData.results.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          ),
        };
      });

      closeModal();
    },
    onError: (error) => {
      console.error("Erro ao atualizar post:", error);
    },
  });

  return (
    <div>
      <svg
        onClick={openModal}
        className="cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="30"
        fill="none"
      >
        <path
          fill="#fff"
          d="m9.101 21.266 5.738-.018L27.36 9.321c.492-.472.762-1.1.762-1.767 0-.667-.27-1.295-.762-1.768L25.3 3.805c-.982-.945-2.697-.94-3.672-.004L9.1 15.73v5.537Zm14.36-15.693 2.066 1.978-2.076 1.978-2.062-1.981 2.072-1.976ZM11.701 16.77l7.84-7.466 2.062 1.982-7.838 7.464-2.064.006v-1.986Z"
        />
        <path
          fill="#fff"
          d="M6.5 26.25h18.203c1.434 0 2.6-1.121 2.6-2.5V12.915l-2.6 2.5v8.335H10.607c-.034 0-.07.012-.103.012-.043 0-.086-.01-.13-.012H6.5V6.25h8.902l2.6-2.5H6.501c-1.434 0-2.6 1.121-2.6 2.5v17.5c0 1.379 1.166 2.5 2.6 2.5Z"
        />
      </svg>

      <dialog
        ref={modalRef}
        className="w-[41.25rem] max-w-[90vw] border border-LeadBorder rounded-2xl p-6"
      >
        <div className="flex flex-col">
          <h3 className="font-bold text-[1.38rem]">Edit Item</h3>

          <span className="mt-6">Title</span>
          <input 
            className="w-full h-8 mt-2 rounded-lg border border-LeadInput px-4" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />

          <span className="mt-6">Content</span>
          <input 
            className="w-full h-8 mt-2 rounded-lg border border-LeadInput px-4" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />

          <div className="flex justify-end items-center mt-6 gap-4">
            <button
              onClick={closeModal}
              className="border border-LeadBorder rounded-lg w-[112px] h-8 font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                updateMutation.mutate({ id: postId, title, content });
              }}
              disabled={updateMutation.isPending}
              className="bg-LeadGreen text-white rounded-lg w-[112px] h-8 font-bold cursor-pointer hover:opacity-80 transition"
            >
              {updateMutation.isPending ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}