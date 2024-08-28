import clientAxios from '@/config/axios';
import useAlert from '@/hooks/useAlert';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

export interface IPost {
  _id: string;
  title: string;
  author?: string;
  img?: string;
  description: string;
  createdAt: number;
  tags?: string[] | null;
}

export interface PostContextProps {
  posts: IPost[];
  post: IPost;
  savePost: (post: IPost) => void;
  deletePost: (id: string) => void;
  updatePost: (post: IPost) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [post, setPost] = useState<IPost>({
    _id: '',
    title: '',
    description: '',
    author: '',
    createdAt: Date.now(),
    tags: [],
  });
  const { showAlert } = useAlert();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('blog_app_token');
        if (!token) return;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios('/posts', config);
        setPosts(data);
        const formattedPosts = data.map((post: IPost) => ({
          ...post,
          createdAt:
            typeof post.createdAt === 'number'
              ? post.createdAt
              : new Date(post.createdAt).getTime(),
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          showAlert(error.response?.data.message, true);
        }
      }
    };

    fetchPosts();
  }, [auth]);

  const updatePost = (updatedPost: IPost) => {
    setPost(updatedPost);
  };

  const deletePost = async (id: string) => {
    try {
      const token = localStorage.getItem('blog_app_token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await clientAxios.delete(`/posts/${id}`, config);

      const stateUpdate = posts.filter((postState) => postState._id !== id);
      setPosts(stateUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  const resetPost = () =>
    setPost({
      _id: '',
      title: '',
      description: '',
      author: '',
      createdAt: Date.now(),
      tags: [],
    });

  const savePost = async (post: IPost) => {
    const token = localStorage.getItem('blog_app_token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (post._id) {
      try {
        const { data } = await clientAxios.put(
          `/posts/${post._id}`,
          post,
          config
        );

        const postUpdate = posts.map((postState) =>
          postState._id === data._id ? data : postState
        );
        setPosts(postUpdate);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { data } = await clientAxios.post('/posts', post, config);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { updatedAt, __v, ...savePost } = data;

        setPosts([savePost as IPost, ...posts]);
      } catch (error) {
        console.error('Error al guardar el post', error);
        if (axios.isAxiosError(error)) {
          showAlert(error.response?.data.message, true);
        }
      }
    }
    resetPost();
  };

  return (
    <PostContext.Provider
      value={{ posts, post, savePost, updatePost, deletePost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
