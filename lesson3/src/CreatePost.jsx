import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from './api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost]);
      setTitle('');
      setBody('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return alert('Please Fil Out All Fields.');
    createPostMutation.mutate({ title, body });
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h2>Create New Post:</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px' }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ padding: '10px', minHeight: '100px' }}
        />
        <button type="submit" disabled={createPostMutation.isLoading} style={{ padding: '10px' }}>
          {createPostMutation.isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {createPostMutation.isError && <p>Eror Creating Post: {createPostMutation.error.message}</p>}
    </div>
  );
};

export default CreatePost;
