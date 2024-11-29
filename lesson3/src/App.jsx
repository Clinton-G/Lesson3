import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from './PostList';
import CreatePost from './CreatePost';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>React Query CRUD App:</h1>
      <CreatePost />
      <PostList />
    </QueryClientProvider>
  );
};

export default App;
