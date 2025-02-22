import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProfileReusablePostsComp from "./ProfileReusablePostComp";
import { PostState } from "../../interfaces/post/postInterface";

interface ProfilePostsCompProps {
  posts: PostState[];
}

const ProfilePostsComp: React.FC<ProfilePostsCompProps> = ({ posts }) => {
  // const { userData } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <ProfileReusablePostsComp postProp={posts} />
    </div>
  );
};

export default ProfilePostsComp;
