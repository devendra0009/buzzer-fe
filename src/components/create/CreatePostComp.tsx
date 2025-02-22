import React, { useState } from "react";
import PostStep1 from "./PostStep1";
import PostStep2 from "./PostStep2";
import { CreatePostCompProps } from "../../interfaces/post/postInterface";

const CreatePostComp: React.FC<CreatePostCompProps> = ({ type }) => {
  const [post, setPost] = useState<File | null>(null);
  console.log(type);

  return (
    <div className=" py-9">
      {post ? (
        <PostStep2 type={type} post={post} setPost={setPost} />
      ) : (
        <PostStep1 setPost={setPost} type={type}/>
      )}
    </div>
  );
};

export default CreatePostComp;
