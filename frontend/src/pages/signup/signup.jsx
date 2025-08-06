import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-0">
      <div className="w-full sm:max-w-md sm:px-10 px-6 py-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-white/20">
        <h1 className="text-3xl font-semibold text-center text-gray-300 mb-6">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-row gap-4 px-2">
            <label className="label p-2">
              <span className="text-base label-text">Gender:</span>
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={inputs.gender === "male"}
                onChange={handleChange}
                className="radio"
              />
              <span className="text-white">Male</span>
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={inputs.gender === "female"}
                onChange={handleChange}
                className="radio"
              />
              <span className="text-white">Female</span>
            </label>
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <Link
            to="/login"
            className="text-sm w-full text-center hover:underline text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-md mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
