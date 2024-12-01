import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
const SignUp = () => {
  //
  const { signUpWithEmailPass, updateUserProfile, sigInWithGoogle, Toast } =
    useContext(AuthContext);
  //
  const data = useLoaderData();
  //
  const navigate = useNavigate();
  //
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.username.value;
    const email = form.email.value;
    const url = form.url.value;
    const pass = form.pass.value;
    const userInfo = { displayName: userName, email, photoURL: url, pass };

    //
    signUpWithEmailPass(userInfo)
      .then((result) => {
        // add to database
        const uInfoFromFirebase = {
          name: userName,
          email: result?.user?.email,
          photoURL: url,
          providerId: result?.user?.providerId,
          emailVerified: result?.user?.emailVerified,
        };
        //

        if (data.find((i) => i.email !== result?.user?.email)) {
          //database
          fetch("https://user-management-server-six.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(uInfoFromFirebase),
          })
            .then((res) => res.json())
            .then(() => {});
        } else {
          return;
        }

        //
        updateUserProfile(userInfo)
          .then(() => {
            Toast.fire({
              position: "top",
              icon: "success",
              title: "🎈Congratulations ! Your Sign Up Success 🎉 ",
            });

            //
          })
          .catch((err) => {});
      })

      .catch((err) => {
        Toast.fire({
          position: "top",
          icon: "error",
          title: `😵❌ ${err.message} `,
        });
        return;
      });
  };
  //
  const handleGoogleSignIn = () => {
    //
    sigInWithGoogle()
      .then((result) => {
        //
        // add to database
        const uInfoFromFirebase = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result?.user?.photoURL,
          providerId: result?.user?.providerId,
          emailVerified: result?.user?.emailVerified,
        };
       
        //
        if (data.find((i) => i.email === result?.user?.email)) {
            Toast.fire({
                position: "top",
                icon: "success",
                title: "🎈Congratulations ! Your Google Login Success 🎉 ",
              });
              navigate("/");
            return
        } else {
          //database
          fetch("https://user-management-server-six.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(uInfoFromFirebase),
          })
            .then((res) => res.json())
            .then(() => {
                Toast.fire({
                    position: "top",
                    icon: "success",
                    title: "🎈Congratulations ! Your First Google Sign in Success 🎉 ",
                  });
                  navigate("/");
            });
        }
       
      })
      .catch((err) => {
        Toast.fire({
          position: "top",
          icon: "error",
          title: `😵❌ ${err.message} `,
        });
      });
  };
  //
  return (
    <div className="md:w-8/12 mx-auto bg-slate-200 rounded-md py-20 mt-20">
      <div>
        <h1 className="text-3xl font-semibold text-center mb-10">Sign Up</h1>
      </div>
      <form onSubmit={handleSignUp} className="space-y-6 px-20">
        {/*  */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            name="username"
            placeholder="Username"
          />
        </label>
        {/*  */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            name="email"
            placeholder="Email"
          />
        </label>

        {/*  */}

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 1 7-7l1.41 1.41a5 5 0 0 1 0 7.07l-3 3a5 5 0 0 1-7.07 0l-.29-.3" />
            <path d="M14 11a5 5 0 0 1-7 7l-1.41-1.41a5 5 0 0 1 0-7.07l3-3a5 5 0 0 1 7.07 0l.29.3" />
          </svg>

          <input
            type="text"
            className="grow"
            name="url"
            placeholder="Photo Url"
          />
        </label>
        {/*  */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            name="pass"
            placeholder="Enter a PassWord"
          />
        </label>
        <input
          className="btn btn-success w-full text-white font-medium text-xl"
          type="submit"
          value="Sign Up"
        />
      </form>
      <div className="w-56 mx-auto text-center py-6">
        <h1 className="text-xl font-semibold mb-3">Have An Account ?</h1>
        <Link to="/login">
          {" "}
          <button className="btn text-center  btn-warning">LogIn</button>
        </Link>
      </div>
      <p className="text-center font-semibold text-2xl">or</p>
      <div className="w-56 mx-auto">
        <button
          onClick={handleGoogleSignIn}
          className="btn text-center mt-5 btn-warning text-base"
        >
          <FaGoogle className="text-green-700 text-lg" />
          SignIn with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
