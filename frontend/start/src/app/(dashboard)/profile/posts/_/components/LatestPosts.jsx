import PostTable from "./PostTable";

function LatestPosts() {
  const query = "sort=latest&limit=5";
  return <PostTable query={query} />;
}

export default LatestPosts;
