import { fetchCardData } from "@/services/data";
import { Card } from "./Card";

async function CardsWrapper() {
  const { numberOfUsers, numberOfComments, numberOfPosts } =
    await fetchCardData();

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-8">
      <Card title="کاربران" value={numberOfUsers} type="users" />
      <Card title="نظرات" value={numberOfComments} type="comments" />
      <Card title="پست ها" value={numberOfPosts} type="posts" />
    </div>
  );
}

export default CardsWrapper;
