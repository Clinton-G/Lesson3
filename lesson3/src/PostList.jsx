import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api';
import Post from './Post';

const PostsList = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loding Posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts List:</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
