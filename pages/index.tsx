import * as styles from '../styles/styled/posts';
import Link from 'next/link';
import Head from 'next/head';

import MainLayout from '../components/MainLayout'

const { H1, PostList, Title, Body, Post } = styles; 

export default function Posts({ posts }) {
  
  return (
    <MainLayout>
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

Posts.getInitialProps = async () => {
  const response = await fetch('https://simple-blog-api.crew.red/posts');
  const posts = await response.json();  
  
  return {
    posts
  }
} 
