import { GetStaticPropsResult } from "next";
import Link from "next/link";

export interface Post {
  id: number;
  name: string;
}

export interface BlogsProps {
  posts: Post[]
}

export const POSTS = [
  { id: 1, name: 'foo' },
  { id: 2, name: 'bar' },
  { id: 3, name: 'baz' },
  { id: 4, name: 'quas' },
];

export default function Blogs(props: BlogsProps) {
  const { posts } = props;
  return (
    <div className="grid grid-cols-4 max-w-4xl m-auto p-4 gap-2">
      {posts.map(post => (
        <Link key={post.id} href={`/blogs/${post.id}`} className="text-blue-500 p-2 border border-gray-300 rounded">{post.name}</Link>
      ))}
    </div>
  )
}

export function getStaticProps(): GetStaticPropsResult<BlogsProps> {
  return {
    props: {
      posts: POSTS,
    }
  }
}
