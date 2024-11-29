import axios from 'axios';
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createPost = async (newPost) => {
  const response = await axios.post(BASE_URL, newPost);
  return response.data;
};

export const updatePost = async (updatedPost) => {
  const response = await axios.put(`${BASE_URL}/${updatedPost.id}`, updatedPost);
  return response.data;
};

export const deletePost = async (postId) => {
  await axios.delete(`${BASE_URL}/${postId}`);
  return postId;
};
