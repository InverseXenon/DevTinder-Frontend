import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

import SwipeCard from "./SwipeCard";
import UserCard from "./UserCard";

const SwipeCardStack = ({ feed }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2">You're all caught up!</h1>
        <p className="text-gray-400 max-w-sm">
          No more profiles to show right now.
          <br />
          Check back later for new connections!
        </p>
      </div>
    );
  }

  // show stack: top 3 cards
  const feedArr = Array.isArray(feed) ? feed : [];
  const topCards = feedArr.slice(0, 3);

  return (
    <div className="relative w-[23rem] h-[34rem] mx-auto mt-6">
      {topCards
        .map((user, idx) => {
          // render from bottom to top
          const stackIndex = topCards.length - 1 - idx;
          return { user, stackIndex };
        })
        .map(({ user, stackIndex }) => (
          <SwipeCard
            key={user._id}
            user={user}
            stackIndex={stackIndex}
            onSwipeLeft={(u) => handleSendRequest("ignored", u._id)}
            onSwipeRight={(u) => handleSendRequest("interested", u._id)}
          >
            <UserCard
              user={user}
              onIgnore={() => handleSendRequest("ignored", user._id)}
              onInterested={() => handleSendRequest("interested", user._id)}
            />
          </SwipeCard>
        ))}
    </div>
  );
};

export default SwipeCardStack;
