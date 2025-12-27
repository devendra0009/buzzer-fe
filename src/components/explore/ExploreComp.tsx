import { Favorite, ChatBubbleOutline } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { PostState } from "../../interfaces/post/postInterface";
import { getAllPostsFromApi } from "../../apis/post/postApi";

const ExploreComp = () => {
  const [postData, setPostData] = useState<PostState[]>([]);

  const fetchAllPost = async () => {
    const res = await getAllPostsFromApi();
    setPostData(res.data);
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  return (
    <div className="flex justify-start overflow-y-auto p-6">
      {/* Explore Grid */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-2 w-[80%] mx-auto  ">
        {postData.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square cursor-pointer overflow-hidden group"
          >
            {/* Image */}
            <img
              src={item.mediaFiles[0]}
              alt={item.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6 text-white font-semibold">
              <div className="flex items-center gap-1">
                <Favorite />
                <span>{item.likedBy.length ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <ChatBubbleOutline />
                <span>{item.comments.length ?? 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreComp;
