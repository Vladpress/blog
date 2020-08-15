import  React, { useState, useEffect } from 'react';
import * as styles from '../styles/styled/posts';
import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';

import MainLayout from '../components/MainLayout';

const { H1, PostList, Title, Body, Post } = styles;

export default function Posts({ posts: serverPosts }) {
  const [posts, setPosts] = useState(serverPosts);

  useEffect(() => {
    async function load() {
      const response = await fetch('https://simple-blog-api.crew.red/posts');
      const json = await response.json();
      setPosts(json);
    }

    if (!serverPosts) {
      load()
    }
  }, []);

  if (!posts) {
    return (
      <MainLayout>
        <p>Loading ...</p>
      </MainLayout>         
    )
  }

  return (
    <MainLayout>
      <Head>
        <title>Posts Page | Next Course</title>
      </Head>
      <H1>Posts
        <Link href={'/new'}>
          <a>
            +
          </a>
        </Link>
      </H1>
      <PostList>
        {posts.map((post, index) => {

          return post.body && post.body.length > 100 ?
            (
              <Post key={index}>
                <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                  <a>
                    <span>{post.id}</span>
                    <Title>{post.title}</Title>
                    <Body>{post.body}</Body>
                  </a>
                </Link>
              </Post>
            ) : ""
        })}
      </PostList>
    </MainLayout>
  )
}

Posts.getInitialProps = async ({ req }) => {
  
  if(!req) return { posts:null }

  const response = await fetch('https://simple-blog-api.crew.red/posts');
  const posts = await response.json();

  return {
    posts
  }
} 

Posts.propTypes = {
  posts:  PropTypes.arrayOf(PropTypes.object)
};