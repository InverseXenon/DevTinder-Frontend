const Login = () => {
  return (
    <div className="flex justify-center my-10">    
    <div className="card w-96 bg-base-200 shadow-xl rounded-2xl border border-base-300">
      <div className="card-body space-y-3">
        <h2 className="card-title text-2xl font-semibold text-blue-500 justify-center">
          Login
        </h2>

        <div className="">
            <div className="form-control w-full max-w-xs">
            <label className="label " htmlFor="email">
              <span className="label-text">Email</span>
              
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full my-2 p-2"
            />
            <label className="label mt-4" htmlFor="email">
              <span className="label-text">Password</span>
              
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full my-2 p-2"
            />

            
          </div>


        </div>

        <div className="card-actions justify-center mt-4">
          <button className= " mt-1 px-3 btn bg-blue-600 border border-base-300 hover:bg-base-200 transition-all rounded-xl">
            Login
          </button>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
