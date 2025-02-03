import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="about py-5 overflow-hidden">
      <div>
        <div className="text ps-5 mt-3 ms-4 position-relative">
          <h1 className="pt-5">Who are we?</h1>
          <div className="pt-2 px-2 my-3 fs-4">
            <p className="">
              We are a goup of friends decided to give the readers their own
              space and world to communicate , discuss and share their special
              opinions together.
            </p>
            <p>If you want to join us ,this is our pleasure. you can</p>
          </div>
          <div className="mt-2 position-relative">
            <Link
              className="btn login position-absolute rounded-5 "
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="btn sign-up position-absolute rounded-5 z-1"
              to={"/register"}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div>
        <img src="/src/assets/about.jpg" alt="" className="" />
      </div>
    </div>
  );
}
