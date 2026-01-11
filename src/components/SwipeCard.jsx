import { useEffect, useMemo, useState } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const SwipeCard = ({
  user,
  children,
  stackIndex = 0, // 0 = TOP card
  onSwipeLeft,
  onSwipeRight,
  setSwipeRef, // { swipeLeft, swipeRight }
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [animatingOut, setAnimatingOut] = useState(false);

  const SWIPE_THRESHOLD = 120;
  const ROTATION = useMemo(() => clamp(pos.x / 18, -15, 15), [pos.x]);

  // stack effect for cards behind
  const stackStyle = useMemo(() => {
    if (stackIndex === 0) return {};
    const scale = 1 - stackIndex * 0.04;
    const translateY = stackIndex * 10;
    return {
      transform: `scale(${scale}) translateY(${translateY}px)`,
      opacity: 1 - stackIndex * 0.12,
      filter: "blur(0px)",
    };
  }, [stackIndex]);

  const swipeOut = (dir) => {
    if (stackIndex !== 0) return;

    setAnimatingOut(true);

    const x = dir === "right" ? 900 : -900;
    const y = pos.y;

    setPos({ x, y });

    // after animation end
    setTimeout(() => {
      if (dir === "left") onSwipeLeft?.(user);
      if (dir === "right") onSwipeRight?.(user);

      // reset for next card
      setPos({ x: 0, y: 0 });
      setAnimatingOut(false);
    }, 220);
  };

  // expose programmatic swipe for buttons
  useEffect(() => {
    if (stackIndex !== 0) return;
    setSwipeRef?.({
      swipeLeft: () => swipeOut("left"),
      swipeRight: () => swipeOut("right"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackIndex, pos.x, pos.y]);

  const handlePointerDown = (e) => {
    if (stackIndex !== 0) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    setIsDragging(true);
    setAnimatingOut(false);
    setStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e) => {
    if (!isDragging || stackIndex !== 0) return;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;

    setPos({ x: dx, y: dy });
  };

  const resetCard = () => setPos({ x: 0, y: 0 });

  const handlePointerUp = () => {
    if (!isDragging || stackIndex !== 0) return;

    setIsDragging(false);

    if (pos.x < -SWIPE_THRESHOLD) return swipeOut("left");
    if (pos.x > SWIPE_THRESHOLD) return swipeOut("right");

    resetCard();
  };

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, start, pos]);

  const likeOpacity = clamp((pos.x - 30) / 120, 0, 1);
  const nopeOpacity = clamp((-pos.x - 30) / 120, 0, 1);

  return (
    <div
      style={stackStyle}
      className={`absolute inset-0 ${stackIndex === 0 ? "z-20" : "z-10"}`}
    >
      <div
        onPointerDown={handlePointerDown}
        className={`select-none touch-none ${
          stackIndex === 0 ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        style={{
          transform:
            stackIndex === 0
              ? `translate(${pos.x}px, ${pos.y}px) rotate(${ROTATION}deg)`
              : undefined,
          transition:
            isDragging || stackIndex !== 0
              ? "none"
              : animatingOut
              ? "transform 220ms ease-out"
              : "transform 200ms ease-out",
        }}
      >
        {/* Like/Nope stamps */}
        {stackIndex === 0 && (
          <>
            <div
              style={{ opacity: likeOpacity }}
              className="absolute top-6 left-6 z-50 rotate-[-18deg] border-4 border-green-400 text-green-400 font-extrabold text-3xl px-4 py-2 rounded-xl"
            >
              LIKE
            </div>
            <div
              style={{ opacity: nopeOpacity }}
              className="absolute top-6 right-6 z-50 rotate-[18deg] border-4 border-red-400 text-red-400 font-extrabold text-3xl px-4 py-2 rounded-xl"
            >
              NOPE
            </div>
          </>
        )}

        {children}
      </div>
    </div>
  );
};

export default SwipeCard;
