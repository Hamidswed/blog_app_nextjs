import { fetchCardData } from "@/services/data";
import { Card } from "./_components/Card";

async function Profile() {
  const { numberOfUsers, numberOfComments, numberOfPosts } =
    await fetchCardData();
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card title="کاربران" value={numberOfUsers} type="users" />
        <Card title="نظرات" value={numberOfComments} type="comments" />
        <Card title="پست ها" value={numberOfPosts} type="posts" />
      </div>
    </div>
  );
}

export default Profile;
