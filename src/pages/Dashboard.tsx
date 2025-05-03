import { useState } from "react";
import Card from "../components/Card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/api-service";

export type Post = {
  id: number;
  username: string;
  created_datetime: Date;
  title: string;
  content: string;
  author_ip: string;
};

export type PostListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
};

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://dev.codeleap.co.uk/careers/"
  );
  const user = localStorage.getItem("username");

  const isDisabled = title.trim() === "" || content.trim() === "";

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle("");
      setContent("");
    },
  });

  const { data } = useQuery<PostListResponse>({
    queryKey: ["posts", currentPageUrl],
    queryFn: () => fetch(currentPageUrl).then((res) => res.json()),
  });

  return (
    <>
      <div className="bg-LeadBackground min-h-screen ">
        <div className="min-h-screen max-w-[50rem] mx-auto bg-white pb-6">
          <div className="h-20 bg-LeadHeader py-[2.31rem] pl-[1.69rem] flex items-center justify-start border-b border-LeadBorder">
            <h3 className="text-white font-bold text-[1.38rem]">
              CodeLeap NetWork
            </h3>
          </div>

          <div className="p-6 mt-6 mx-6 border border-LeadBorder rounded-xl">
            <h3 className="text-[1.38rem] font-bold mb-6">
              What’s on your mind, {user}?
            </h3>

            <span className="block">Title</span>
            <input
              className="w-full h-[2rem] mt-2 border border-LeadInput rounded-md pl-2.5"
              placeholder="Hello world"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <span className="block mt-6">Content</span>
            <input
              className="w-full h-[2rem] mt-2 border border-LeadInput rounded-md pl-2.5"
              placeholder="Content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex justify-end items-center">
              <button
                onClick={() =>
                  createMutation.mutate({
                    username: user,
                    title,
                    content,
                  })
                }
                className="bg-LeadButton text-white rounded-lg w-[112px] h-8 mt-4 font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isDisabled}
              >
                Create
              </button>
            </div>
          </div>

          <div className="mx-6 pb-4">
            {data?.results.map((post: Post) => (
              <Card
                key={post.id}
                id={post.id}
                username={post.username}
                title={post.title}
                content={post.content}
                date={post.created_datetime}
                currentPageUrl={currentPageUrl}
                setCurrentPageUrl={setCurrentPageUrl}
              />
            ))}
          </div>

          {data?.results && data.results.length > 0 ? (
            <div className="flex justify-between mt-4 mx-6 mb-6">
              <button
                onClick={() =>
                  data?.previous && setCurrentPageUrl(data.previous)
                }
                disabled={!data?.previous}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => data?.next && setCurrentPageUrl(data.next)}
                disabled={!data?.next}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
