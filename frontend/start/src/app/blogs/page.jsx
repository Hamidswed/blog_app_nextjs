import { Suspense } from "react";
import PostList from "./_components/PostList";
import Loading from "./loading";

async function BlogsPage() {
  return (
    <div>
      <p className="text-secondary-500 mb-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, eius
      </p>
      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </div>
  );
}

export default BlogsPage;
