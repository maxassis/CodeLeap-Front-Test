import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostListResponse } from "../pages/Dashboard";
import { deletePost } from "../api/api-service";

interface ModalDeleteProps {
  postId: number;
  currentPageUrl: string;
  setCurrentPageUrl: React.Dispatch<React.SetStateAction<string>>
}

export default function ModalDelete({ postId, currentPageUrl, setCurrentPageUrl }: ModalDeleteProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  function openModal() {
    modalRef.current?.showModal();
  }

  function closeModal() {
    modalRef.current?.close();
  }

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: async () => deletePost(postId),
    onSuccess: (_, id) => {
      queryClient.setQueryData<PostListResponse>(["posts", currentPageUrl], (oldData) => {
        if (!oldData) return oldData;

        const newResults = oldData.results.filter((post) => post.id !== id);

        if (oldData.results.length === 1 && newResults.length === 0) {
          if (oldData.previous) {
            setCurrentPageUrl(oldData.previous); 

            queryClient.invalidateQueries({ 
              queryKey: ["posts", oldData.previous] 
            });
          }
        }

        const PAGE_SIZE = 10;
        const hasNextPage = newResults.length === PAGE_SIZE && !!oldData.next;
        
        return {
          ...oldData,
          results: oldData.results.filter((post) => post.id !== id),
          next: hasNextPage ? oldData.next : null,
        };
      });

      closeModal();
    },
    onError: (error) => {
      console.error("Failed to delete post:", error);
    },
  });

  return (
    <div>
      <svg
        onClick={openModal}
        className="cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="24"
        fill="none"
      >
        <path
          fill="#fff"
          d="M1.8 20.75c0 1.375 1.171 2.5 2.601 2.5h10.401c1.43 0 2.6-1.125 2.6-2.5v-15H1.801v15Zm3.2-8.9 1.832-1.762 2.77 2.65 2.756-2.65 1.833 1.762-2.756 2.65 2.756 2.65-1.833 1.763-2.756-2.65-2.757 2.65-1.833-1.763L7.77 14.5l-2.77-2.65ZM14.151 2l-1.3-1.25h-6.5L5.051 2H.5v2.5h18.202V2h-4.55Z"
        />
      </svg>

      <dialog
        ref={modalRef}
        className="w-[41.25rem] max-w-[90vw] border border-LeadBorder rounded-2xl p-6"
      >
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-2">
            Are you sure you want to delete this item?
          </h3>

          <div className="flex gap-4 justify-end items-center mt-10">
            <button
              onClick={closeModal}
              className="text-black rounded-lg border border-LeadBorder py-1.5 px-8 font-bold cursor-pointer
             hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => deleteMutation.mutate(postId)}
              disabled={deleteMutation.isPending}
              className={`bg-LeadRed text-white rounded-lg py-1.5 px-8 font-bold cursor-pointer hover:opacity-80 transition ${
                deleteMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
