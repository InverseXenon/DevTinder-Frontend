import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useRef } from "react";

import SwipeCard from "./SwipeCard";
import UserCard from "./UserCard";

const SwipeCardStack = ({ feed }) => {
  const dispatch = useDispatch();
  const swipeApiRef = useRef(null); // ✅ store top card swipe functions

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

  const feedArr = Array.isArray(feed) ? feed : [];
  if (!feedArr || feedArr.length === 0) return null;

  const topCards = feedArr.slice(0, 3);

  return (
    <div className="relative w-[23rem] h-[34rem] mx-auto mt-6">
      {topCards
        .map((user, idx) => {
          const stackIndex = topCards.length - 1 - idx;
          return { user, stackIndex };
        })
        .map(({ user, stackIndex }) => (
          <SwipeCard
            key={user._id}
            user={user}
            stackIndex={stackIndex}
            setSwipeRef={stackIndex === 0 ? (api) => (swipeApiRef.current = api) : undefined}
            onSwipeLeft={(u) => handleSendRequest("ignored", u._id)}
            onSwipeRight={(u) => handleSendRequest("interested", u._id)}
          >
            <UserCard
              user={user}
              onIgnore={() => swipeApiRef.current?.swipeLeft()}       // ✅ animate + remove
              onInterested={() => swipeApiRef.current?.swipeRight()} // ✅ animate + remove
            />
          </SwipeCard>
        ))}
    </div>
  );
};

export default SwipeCardStack;
