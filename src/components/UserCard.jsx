const UserCard = ({user}) => {
    const {firstName,lastName,photoUrl, age, gender, about} = user;
    return (
    <>
        <div className="card bg-base-300  w-[23rem] shadow-lg">
            <figure>
                <img
                src={photoUrl}
                alt={firstName} />
            </figure>
            <div className="card-body">
                <h2 className="card-title flex justify-center font-bold text-2xl">{firstName} {lastName}</h2>
                <p className="font-bold flex justify-center">{age} {gender?.charAt(0).toUpperCase() + gender?.slice(1)}</p>
                <p>{about}</p>
                <div className="card-actions justify-center my-1">
                    <button className="btn bg-red-700 p-2">
                        Ignore
                    </button>
                    <button className="btn bg-green-700 p-2">
                        Interested
                    </button>
                </div>
            </div>
            </div>
    </>
  )
}

export default UserCard