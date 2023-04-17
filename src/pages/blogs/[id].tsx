import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next"
import { POSTS, Post } from "."
import Link from "next/link"

interface BlogProps {
  post?: Post
}

export default function Blog(props: BlogProps) {
  return (
    <div>
      <h1>Blog post: {props.post?.name}</h1>
      <Link href="/blogs" className="text-blue-500">Back</Link>
    </div>
  )
}

export function getStaticProps(ctx: GetStaticPropsContext<{ id: string }>): GetStaticPropsResult<BlogProps> {
  return {
    props: {
      post: POSTS.find(post => post.id.toString() === ctx.params?.id)
    }
  }
}

export function getStaticPaths(): GetStaticPathsResult<{ id: string }> {
  return {
    paths: POSTS.map(post => ({
      params: { 
        id: post.id.toString(),
      }
    })),
    fallback: false,
  }
}
