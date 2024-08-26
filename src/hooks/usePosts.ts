import PostContext, { PostContextProps } from '@/context/PostProvider';
import { useContext } from 'react';

const usePosts = (): PostContextProps => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error('usePosts must be used within an PostProvider');
  }

  return context;
};

export default usePosts;
