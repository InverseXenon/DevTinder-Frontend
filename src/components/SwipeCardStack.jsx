import axios from "axios";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

import SwipeCard from "./SwipeCard";
import UserCard from "./UserCard";

const SwipeCardStack = ({ feed }) => {
  const dispatch = useDispatch();
  const swipeApiRef = useRef(null);

  const feedArr = Array.isArray(feed) ? feed : [];
  const topCards = feedArr.slice(0, 3);

  const handleSendRequest = async (status, userId) => {
    // ✅ OPTIMISTIC UI UPDATE = no delay
    dispatch(removeUserFromFeed(userId));

    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      // rollback optional
    }
  };

  if (!topCards || topCards.length === 0) return null;

  return (
    <div className="relative w-[23rem] h-[34rem] mx-auto mt-6">
      {/* Render bottom -> top */}
      {[...topCards].reverse().map((user, idx) => {
        const isTop = idx === topCards.length - 1;
        const stackIndex = isTop ? 0 : idx + 1; // 0 = top swipeable, others behind

        return (
          <SwipeCard
            key={user._id}
            user={user}
            stackIndex={stackIndex}
            setSwipeRef={
              isTop ? (api) => (swipeApiRef.current = api) : undefined
            }
            onSwipeLeft={(u) => handleSendRequest("ignored", u._id)}
            onSwipeRight={(u) => handleSendRequest("interested", u._id)}
          >
            <UserCard
              user={user}
              onIgnore={() => swipeApiRef.current?.swipeLeft()}
              onInterested={() => swipeApiRef.current?.swipeRight()}
            />
          </SwipeCard>
        );
      })}
    </div>
  );
};

export default SwipeCardStack;
