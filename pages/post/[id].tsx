import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import MainLayout from '../../components/MainLayout';
import config from '../../next.config';
import { NextPageContext } from 'next';

export default function Post({ post: serverPost }) {
  const [post, setPost] = useState(serverPost)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await fetch(`${config.env.API_URL + router.query.id}`);
      const data = await response.json();
      setPost(data);
    }

    if (!serverPost) {
      load()
    }
  }, [])

  if (!post) {
    return <MainLayout>
      <p>Loading ...</p>
    </MainLayout>
  }

  return (   
    <MainLayout>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <Link href={'/'}><a>Back to all posts</a></Link>
    </MainLayout>  
  )
}


interface PostNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}

Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
  if (!req) return {post: null}
  
  const response = await fetch(`${config.env.API_URL + query.id }`);
  const post = await response.json();

  return {
    post
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })
};