import { useState } from "react";
import Card from "../components/Card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

  const isDisabled = title.trim() === "" || content.trim() === "";

  function createPost({
    username,
    title,
    content,
  }: {
    username: string;
    title: string;
    content: string;
  }) {
    return fetch("https://dev.codeleap.co.uk/careers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, title, content }),
    }).then((res) => {
      if (!res.ok) throw new Error("Erro ao criar post");
      return res.json();
    });
  }

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] }); 
      setTitle("");
      setContent("");
    },
  });

  function getPosts() {
    return fetch("https://dev.codeleap.co.uk/careers/").then((res) =>
      res.json()
    );
  }

  const { data } = useQuery<PostListResponse>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  console.log(data);

  return (
    <>
      <div className="bg-LeadBackground min-h-screen">
        <div className="min-h-screen max-w-[50rem] mx-auto bg-white">
          <div className="h-20 bg-LeadHeader py-[2.31rem] pl-[1.69rem] flex items-center justify-start border-b border-LeadBorder">
            <h3 className="text-white font-bold text-[1.38rem]">
              CodeLeap NetWork
            </h3>
          </div>

          <div className="p-6 mt-6 mx-6 border border-LeadBorder rounded-xl">
            <h3 className="text-[1.38rem] font-bold mb-6">
              What’s on your mind?
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
                    username: "max",
                    title,
                    content,
                  })
                }
                className="bg-LeadButton text-white rounded-lg w-[112px] h-8 mt-4 font-bold cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={isDisabled}
              >
                Create
              </button>
            </div>
          </div>

          <div className="mx-6 pb-6">
            {data?.results.map((post: Post) => (
              <Card
                key={post.id}
                id={post.id}
                username={post.username}
                title={post.title}
                content={post.content}
                date={post.created_datetime}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
