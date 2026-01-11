const UserCard = ({ user, onIgnore, onInterested }) => {
  if (!user) return null;

  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-[23rem] shadow-lg overflow-hidden">
      <figure className="h-[18rem] overflow-hidden">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title flex justify-center font-bold text-2xl">
          {firstName} {lastName}
        </h2>

        <p className="font-bold flex justify-center">
          {age} {gender?.charAt(0).toUpperCase() + gender?.slice(1)}
        </p>

        <p className="text-sm opacity-90">{about}</p>

        <div className="card-actions justify-center my-2 gap-4">
          <button className="btn bg-red-700 p-2" onClick={onIgnore}>
            Ignore
          </button>
          <button className="btn bg-green-700 p-2" onClick={onInterested}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
