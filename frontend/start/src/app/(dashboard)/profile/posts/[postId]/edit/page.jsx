import { getPostById } from "@/services/postServices";
import Breadcrumbs from "@/ui/Breadcrumbs";
import { notFound } from "next/navigation";
import CreatePostForm from "../../create/_/CreatePostForm";

async function EditPage({ params: { postId } }) {
  const { post } = await getPostById(postId);

  if (!post) {
    notFound();
  }
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "پست ها",
            href: "/profile/posts",
          },
          {
            label: "ویرایش پست",
            href: `/profile/posts/${postId}/edit`,
          },
        ]}
      />
      <CreatePostForm postToEdit={post}/>
    </div>
  );
}

export default EditPage;
