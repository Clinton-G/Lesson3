import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost, updatePost } from './api';

const Post = ({ post }) => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (postId) => {
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.filter((post) => post.id !== postId)
      );
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    },
  });

  const handleDelete = () => {
    deletePostMutation.mutate(post.id);
  };

  const handleUpdate = () => {
    const updatedPost = { ...post, title: 'Updated Title', body: 'Updated body content' };
    updatePostMutation.mutate(updatedPost);
  };

  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={handleUpdate} disabled={updatePostMutation.isLoading}>
        {updatePostMutation.isLoading ? 'Updating...' : 'Update'}
      </button>
      <button onClick={handleDelete} disabled={deletePostMutation.isLoading}>
        {deletePostMutation.isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default Post;
