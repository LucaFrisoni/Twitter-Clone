import axios from "axios";

export const usePostTweet = async (
  method: string,
  email?: string,
  body?: string
) => {
  // if (method === "post") {
  //   const post = await axios.post("http://localhost:3000/api/posts", {
  //     body,
  //     email,
  //   });
  // }
  if (method === "get") {
    if (email) {
      const { data } = await axios.get(
        `http://localhost:3000/api/posts?email=${email}`
      );
      return data;
    }
    const { data } = await axios.get(`http://localhost:3000/api/posts`);
    return data;
  }
};
