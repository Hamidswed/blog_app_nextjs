import Table from "@/ui/Table";

function PostRow({ post, index }) {
  const { title, category, author, createdAt, type } = post;
  return (
    <Table.Row>
      <td>{numberFormatter(index + 1)}</td>
      <td>{title}</td>
      <td>{category.title}</td>
      <td>{author.name}</td>
      <td>{createdAt}</td>
      <td>{type}</td>
    </Table.Row>
  );
}

export default PostRow;
