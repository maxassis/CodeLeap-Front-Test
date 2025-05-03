const BASE_URL = "https://dev.codeleap.co.uk/careers/";

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

export const getPosts = (): Promise<PostListResponse> => {
  return fetch(BASE_URL).then((res) => res.json());
};

export const createPost = (postData: {
  username: string | null;
  title: string;
  content: string;
}): Promise<Post> => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  }).then((res) => {
    if (!res.ok) throw new Error("Erro ao criar post");
    return res.json();
  });
};

export const deletePost = (postId: number): Promise<void> => {
  return fetch(`${BASE_URL}${postId}/`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("Erro ao deletar post");
    return undefined;
  });
};

export const updatePost = (
  id: number,
  postData: {
    title: string;
    content: string;
  }
): Promise<Post> => {
  return fetch(`${BASE_URL}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  }).then((res) => {
    if (!res.ok) throw new Error("Erro ao atualizar post");
    return res.json();
  });
};
