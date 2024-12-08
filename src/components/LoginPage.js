import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../redux/authSlice";
import React, { useState } from "react";
import axios from 'axios';
import "./SlidingForm.css";

const LoginPage = ({setIsCartOpen}) => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [loginEmail, setEmail] = useState("");
    const [loginUsername, setUsername] = useState("");
    const [loginPassword, setPassword] = useState("");
    const [SignupEmail, setSignupEmail] = useState("");
    const [SignupUsername, setSignupUsername] = useState("");
    const [SignupPassword, setSignupPassword] = useState("");
    const [isRemembered, setIsRemembered] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleLogPassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleSignupEmail = (event) => {
      setSignupEmail(event.target.value);
  };

  const handleSignupPassword = (event) => {
      setSignupPassword(event.target.value);
  };

  const handleSignupUsername = (e) => {
      setSignupUsername(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`API Response: email: ${loginEmail},
      password: ${loginPassword}` );
      try {
          const response = await axios.post("http://localhost:5000/api/login", {
              email: loginEmail,
              password: loginPassword,
          }, {
            withCredentials: true, // If you're using cookies for session
        });
          console.log(`API Response: email: ${loginEmail},
            password: ${loginPassword}` );

          if (response.status === 200) {
              console.log("Login successful", response.data.user);
              const user = response.data.user; // Extract user data
            console.log(user?.username || null);

            // Dispatch Redux action to set user state
            dispatch(login(user));

            // Navigate to the home page
            navigate('/');
          }
      } catch (error) {
          console.error("Error during login:", error.response?.data?.message || "An error occurred");
      }
  
  

                // try {
                //     const response = await fetch('http://localhost:5000/api/login', {
                //         method: 'GET',
                //         credentials: 'include',
                //         headers: { 
                //             'Content-Type': 'application/json',
                //             'Accept': 'application/json'
                //         }
                //     });
                //     if (response.ok) {
                //         const data = await response.json();
                //         setLoginInfo(data.user?.username || null); 
                //         setLoginError(null);
                //         dispatch(login(data.user)); // Dispatch the login action with user data
                //         navigate('/');
                //     } else {
                //         setLoginError('Failed to retrieve login info');
                //         setLoginInfo(null);
                //     }
                // } catch (error) {
                //     console.error('Error retrieving login info:', error);
                //     setLoginError('Unable to connect to server');
                //     setLoginInfo(null);
                // }
            };

            const handleSubmit1 = async (event) => {
              event.preventDefault();
          
              const signupData = { username: SignupUsername, email: SignupEmail, password: SignupPassword };
          
              console.log('Signup data:', signupData);
          
              try {
                const response = await fetch('http://localhost:5000/api/register', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(signupData),
              });
              
          
                  if (response.ok) {
                      const data = await response.json();
                      console.log('Signup successful:', data);
                      setIsSignUpMode(false); // Switch to login mode on successful signup
                  } else {
                      const errorData = await response.json();
                      setLoginError(errorData.message || 'Signup failed. Please try again.');
                  }
              } catch (error) {
                  console.error('Error during signup:', error);
                  setLoginError('Unable to connect to server. Please try again later.');
                   // Check if the error indicates that the email is not found
        if (error.response?.status === 401) { // Assuming 401 is the status for invalid credentials
          setIsSignUpMode(true); // Switch to sign-up mode
      }
              }
          };
          

    const checkEmailExists = async (email) => {
        try {
            const response = await fetch('http://localhost:5000/api/getuser', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data.user?.email === email; // Adjust this line based on your data structure
            } else {
                console.error('Failed to retrieve login info');
                return false;
            }
        } catch (error) {
            console.error('Error retrieving login info:', error);
            return false;
        }
    };
    const handleSignInClick = () => {
      setIsSignUpMode(false);
    };
  
    const handleSignUpClick = () => {
      setIsSignUpMode(true);
    };
  
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className={`form-container ${isSignUpMode ? "sign-up-mode" : ""}`}>
          {/* Sign-In Form */}
          <div className="form sign-in-form">
            <h2 className="text-3xl font-bold mb-6">Sign In</h2>
            <form onSubmit={handleLogin}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="logUsername"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  onChange={handleLogUsername}
                  value={loginUsername}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="logEmail"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  onChange={handleLogEmail}
                  value={loginEmail}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="logPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  onChange={handleLogPassword}
                  value={loginPassword}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </form>
          </div>
  
          {/* Sign-Up Form */}
          <div className="form sign-up-form">
            <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit1}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  onChange={handleSignupUsername}
                  value={SignupUsername}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  onChange={handleSignupEmail}
                  value={SignupEmail}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  onChange={handleSignupPassword}
                  value={SignupPassword}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </form>
          </div>
  
          {/* Overlay Container */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
                <p className="mb-6">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={handleSignInClick}
                  className="py-2 px-4 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h2 className="text-3xl font-bold mb-6">Hello, Friend!</h2>
                <p className="mb-6">
                  Enter your personal details and start your journey with us
                </p>
                <button
                  onClick={handleSignUpClick}
                  className="py-2 px-4 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  
export default LoginPage;


// function LoginPage({ setIsCartOpen }) {
    // const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [isRemembered, setIsRemembered] = useState(false);
    // const [loginError, setLoginError] = useState(null);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const handleEmailChange = (event) => {
    //     setEmail(event.target.value);
    // };

    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // };

    // const handleRememberChange = (event) => {
    //     setIsRemembered(event.target.checked);
    // };

    // const handleUsernameChange = (e) => {
    //     setUsername(e.target.value);
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const emailExists = await checkEmailExists(email);

    //     if (!emailExists) {
    //         setLoginError('Email not found. Please register first.');
    //         return;
    //     }

    //     const loginData = { username, email, password, isRemembered };

    //     try {
    //         const response = await fetch('http://localhost:5000/api/login', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(loginData),
    //             credentials: 'include', // Include cookies
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Login info saved:', data);
    //             dispatch(login(data.user)); // Dispatch the login action with user data
    //             navigate('/');
    //             setIsCartOpen(true);
    //         } else {
    //             setLoginError('Login failed. Please check your credentials.');
    //         }
    //     } catch (error) {
    //         console.error('Error saving login info:', error);
    //         setLoginError('Unable to connect to server. Please try again later.');
    //     }
    // };

    // const checkEmailExists = async (email) => {
    //     try {
    //         const response = await fetch('http://localhost:5000/api/login', {
    //             method: 'GET',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             return data.user?.email === email; // Adjust this line based on your data structure
    //         } else {
    //             console.error('Failed to retrieve login info');
    //             return false;
    //         }
    //     } catch (error) {
    //         console.error('Error retrieving login info:', error);
    //         return false;
    //     }
    // };

//     return (
//         <div className="flex min-h-screen items-center">
//             <div className="flex flex-col items-center justify-center pb-24 pt-0 px-4 sm:px-6 lg:px-8 w-1/2 bg-white">
//                 <div className="max-w-md w-full space-y-8">
//                     <div>
//                         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                             Welcome back
//                         </h2>
//                         <p className="mt-2 text-center text-sm text-gray-600">
//                             Please enter your details
//                         </p>
//                     </div>
//                     {loginError && <div className="text-red-600">{loginError}</div>} {/* Display error message */}
//                     <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                         <div>
//                             <label
//                                 htmlFor="username"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Username
//                             </label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 id="username"
//                                 autoComplete="username"
//                                 required
//                                 className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 value={username}
//                                 onChange={handleUsernameChange}
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Email address
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 id="email"
//                                 autoComplete="email"
//                                 required
//                                 className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 value={email}
//                                 onChange={handleEmailChange}
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 id="password"
//                                 autoComplete="current-password"
//                                 required
//                                 className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                             />
//                         </div>
//                         <div className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id="remember"
//                                 checked={isRemembered}
//                                 onChange={handleRememberChange}
//                                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                             />
//                             <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
//                                 Remember me
//                             </label>
//                         </div>
//                         <div>
//                             <button
//                                 type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Sign in
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <div className="w-100 bg-cover bg-center  pt-0"style={{background:"grey"}}>
//                 <div className="flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-50">
//                   <h4 style={{color:"red"}}>Welcome to Veggies Shop!</h4>
//                   <button></button>
//                     {/* <img
//                         alt="loginImg"
//                         src="Images/Klinics_logo.png"
//                         style={{ backgroundSize: "cover", border: "1px solid black" }}
//                     /> */}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LoginPage;
// const LoginPage = ({ setIsCartOpen }) => {
//   const [isSignUpMode, setIsSignUpMode] = useState(false);

//   const handleSignInClick = () => {
//     setIsSignUpMode(false);
//   };

//   const handleSignUpClick = () => {
//     setIsSignUpMode(true);
//   };
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRemembered, setIsRemembered] = useState(false);
//   const [loginError, setLoginError] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleEmailChange = (event) => {
//       setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//       setPassword(event.target.value);
//   };

//   const handleRememberChange = (event) => {
//       setIsRemembered(event.target.checked);
//   };

//   const handleUsernameChange = (e) => {
//       setUsername(e.target.value);
//   };

//   const handleSubmit = async (event) => {
//       event.preventDefault();

//       const emailExists = await checkEmailExists(email);

//       if (!emailExists) {
//           setLoginError('Email not found. Please register first.');
//           return;
//       }

//       const loginData = { username, email, password, isRemembered };

//       try {
//           const response = await fetch('http://localhost:5000/api/login', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(loginData),
//               credentials: 'include', // Include cookies
//           });

//           if (response.ok) {
//               const data = await response.json();
//               console.log('Login info saved:', data);
//               dispatch(login(data.user)); // Dispatch the login action with user data
//               navigate('/');
//               setIsCartOpen(true);
//           } else {
//               setLoginError('Login failed. Please check your credentials.');
//           }
//       } catch (error) {
//           console.error('Error saving login info:', error);
//           setLoginError('Unable to connect to server. Please try again later.');
//       }
//   };

//   const checkEmailExists = async (email) => {
//       try {
//           const response = await fetch('http://localhost:5000/api/login', {
//               method: 'GET',
//               credentials: 'include',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Accept': 'application/json'
//               }
//           });

//           if (response.ok) {
//               const data = await response.json();
//               return data.user?.email === email; // Adjust this line based on your data structure
//           } else {
//               console.error('Failed to retrieve login info');
//               return false;
//           }
//       } catch (error) {
//           console.error('Error retrieving login info:', error);
//           return false;
//       }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex justify-center items-center">
//       <div
//         className={`form-container relative ${
//           isSignUpMode ? "sign-up-mode" : ""
//         }`}
//         style={{
//           maxWidth: "900px",
//           margin: "0 auto",
//           padding: "2rem",
//         }}
//       >
//         {/* Sign-In Form */}
//         <div
//           className="form sign-in-form"
//           style={{
//             padding: "2rem",
//             flex: 1,
//             transition: "all 0.6s ease-in-out",
//             transform: isSignUpMode ? "translateX(-100%)" : "translateX(0)",
//           }}
//         >
//           <h2 className="text-3xl font-bold mb-6">Sign In</h2>
//           <form onSubmit={handleSubmit} >
//                         <div>
//                             <label
//                                 htmlFor="username"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Username
//                             </label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 id="username"
//                                 autoComplete="username"
//                                 required
//                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 onChange={handleUsernameChange}
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Email address
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 id="email"
//                                 autoComplete="email"
//                                 required
//                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 value={email}
//                                 onChange={handleEmailChange}
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 id="password"
//                                 autoComplete="current-password"
//                                 required
//                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                             />
//                         </div>
//                         <div className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id="remember"
//                                 checked={isRemembered}
//                                 onChange={handleRememberChange}
//                                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                             />
//                             <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
//                                 Remember me
//                             </label>
//                         </div>
//                         <div>
//                             <button
//                                 type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Sign in
//                             </button>
//                         </div>
//                     </form>
//         </div>

//         {/* Sign-Up Form */}
//         <div
//           className="form sign-up-form"
//           style={{
//             padding: "2rem",
//             flex: 1,
//             transition: "all 0.6s ease-in-out",
//             transform: isSignUpMode ? "translateX(0)" : "translateX(100%)",
//           }}
//         >
//           <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
//           <form onSubmit={handleSubmit}  >
//                         <div>
//                             <label
//                                 htmlFor="username"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Username
//                             </label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 id="username"
//                                 autoComplete="username"
//                                 required
//                                 className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 value={username}
//                                 onChange={handleUsernameChange}
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Email address
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 id="email"
//                                 autoComplete="email"
//                                 required
//                                 className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 value={email}
//                                 onChange={handleEmailChange}
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 id="password"
//                                 autoComplete="current-password"
//                                 required
//                                 className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                             />
//                         </div>
//                         <div className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id="remember"
//                                 checked={isRemembered}
//                                 onChange={handleRememberChange}
//                                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                             />
//                             <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
//                                 Remember me
//                             </label>
//                         </div>
//                         <div>
//                             <button
//                                 type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Sign Up
//                             </button>
//                         </div>
//                     </form>
//         </div>

//         {/* Overlay Container */}
//         <div
//           className="overlay-container"
//           style={{
//             position: "absolute",
//             top: 0,
//             left: "50%",
//             width: "50%",
//             height: "100%",
//             overflow: "hidden",
//             transition: "transform 0.6s ease-in-out",
//             zIndex: 100,
//             transform: isSignUpMode ? "translateX(-100%)" : "translateX(0)",
//           }}
//         >
//           <div
//             className="overlay"
//             style={{
//               background: "linear-gradient(to right, #ff4b2b, #ff416c)",
//               position: "relative",
//               left: "-100%",
//               height: "100%",
//               width: "200%",
//               transform: isSignUpMode ? "translateX(50%)" : "translateX(0)",
//               transition: "transform 0.6s ease-in-out",
//             }}
//           >
//             <div
//               className="overlay-panel overlay-left"
//               style={{
//                 position: "absolute",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 padding: "0 2rem",
//                 top: 0,
//                 height: "100%",
//                 width: "50%",
//                 transform: isSignUpMode ? "translateX(0)" : "translateX(-20%)",
//                 transition: "transform 0.6s ease-in-out",
//               }}
//             >
//               <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
//               <p className="mb-6">
//                 To keep connected with us please login with your personal info
//               </p>
//               <button
//                 onClick={handleSignInClick}
//                 className="py-2 px-4 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign In
//               </button>
//             </div>
//             <div
//               className="overlay-panel overlay-right"
//               style={{
//                 position: "absolute",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 padding: "0 2rem",
//                 top: 0,
//                 height: "100%",
//                 width: "50%",
//                 transform: isSignUpMode ? "translateX(20%)" : "translateX(0)",
//                 transition: "transform 0.6s ease-in-out",
//                 right: 0,
//               }}
//             >
//               <h2 className="text-3xl font-bold mb-6">Hello, Friend!</h2>
//               <p className="mb-6">
//                 Enter your personal details and start your journey with us
//               </p>
//               <button
//                 onClick={handleSignUpClick}
//                 className="py-2 px-4 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

