import PostList from "../_components/PostList";
import { cookies } from "next/headers";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPosts } from "@/services/postServices";
import queryString from "query-string";

async function BlogsPage({ searchParams }) {
  const queries = queryString.stringify(searchParams);
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  const posts = await getPosts(queries, options);
  console.log(posts);
  const { search } = searchParams;
  return (
    <>
      {search ? (
        <p className="mb-4 text-secondary-700">
          {posts.length === 0
            ? "هیچ پستی با این مشخصات پیدا نشد"
            : ` نشان دادن ${posts.length} نتیجه برای`(
                <span classNames="font-bold">&quot;{search}&quot;</span>
              )}
        </p>
      ) : null}
      <PostList posts={posts} />
    </>
  );
} 

export default BlogsPage;
