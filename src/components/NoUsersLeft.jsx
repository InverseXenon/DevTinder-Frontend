const NoUsersLeft = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold mb-2">
        You're all caught up!
      </h1>
      <p className="text-gray-400 max-w-sm">
        No more profiles to show right now.  
        Check back later for new connections 👀
      </p>
    </div>
  );
};

export default NoUsersLeft;
