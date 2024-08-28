import Spinner from "@/ui/Spinner";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-x-4">
      <span className="text-lg text-secondary-500">در حال بارگذاری پست ها</span>
      <Spinner />
    </div>
  );
}

export default Loading;
