import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from './api';

const UpdatePost = ({ post, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const queryClient = useQueryClient();

  const updatePostMutation = useMutation(updatePost, {
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
      onCancel();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePostMutation.mutate({ id: post.id, title, body });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '10px' }}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ padding: '10px', minHeight: '100px' }}
      />
      <button type="submit" disabled={updatePostMutation.isLoading} style={{ padding: '10px' }}>
        {updatePostMutation.isLoading ? 'Updating...' : 'Update Post'}
      </button>
      <button type="button" onClick={onCancel} style={{ padding: '10px' }}>
        Cancel
      </button>
      {updatePostMutation.isError && <p>Eror Updating The Post: {updatePostMutation.error.message}</p>}
    </form>
  );
};

export default UpdatePost;
