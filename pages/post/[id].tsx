import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

import MainLayout from '../../components/MainLayout'

export default function Post({ post }) {
  
  return (   
    <MainLayout>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <Link href={'/'}><a>Back to all posts</a></Link>
    </MainLayout>  
  )
}

Post.getInitialProps = async ( ctx ) => {
  const response = await fetch(`https://simple-blog-api.crew.red/posts/${ctx.query.id}`);
  const post = await response.json();

  return {
    post
  }
}