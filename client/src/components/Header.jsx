
// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from '../images/Logo.jpg';

// export default function Header() {

//   return (
//     <header className="bg-glass p-4 m-auto flex justify-center top-0 left-0 max-w-[1500px] max-h-[70px]">
//         <Link to={'/'} className="flex items-center gap-10">
       
      
//         <img src={Logo} alt="Logo" className="w-25 h-25"></img>
//       </Link>

//       <div className="flex gap-2 border border-red-300 rounded-full py-2 px-4">
//         <Link to={"/profile"}>Profile</Link>
//         <div className="border-l border-blue-500"></div>
//         <Link to={"/warehouse"}>Warehouses</Link>
//         <div className="border-l border-blue-500"></div>
//         <Link to={"/login"}>Login</Link>
//       </div>
        
//     </header>
//   );
// // }
// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from '../images/Logo.jpg';

// export default function Header() {

//   return (
//     <header className="bg-gray-800 p-4 flex justify-between items-center w-screen">
//       <Link to={'/'} className="logo">
//         <img src={Logo} alt="Logo" className="w-32 h-auto mx-4" style={{background: 'none'}} />
//       </Link>

//       <div className="links flex justify-center flex-1 text-2xl">
//         <Link to={"/profile"} className="link text-white hover:text-gray-300 mr-4">Profile</Link>
//         <div className="divider h-6 bg-white text-2xl"></div>
//         <Link to={"/warehouse"} className="link text-white hover:text-gray-300 mx-4">Warehouses</Link>
//         <div className="divider h-6 bg-white text-2xl"></div>
//         <Link to={"/login"} className="link text-white hover:text-gray-300 ml-4">Login</Link>
//       </div>
//     </header>
//   );
// }


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from '../images/Logo.jpg';
import { UserContext } from "../UserContext";

export default function Header() {

  const {user, setUser} = useContext(UserContext);

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center w-screen">
      <Link to={user?'/warehouse':'/login'} className="logo">
        <img 
          src={Logo} 
          alt="Logo" 
          className="w-32 h-auto mx-4 logo-img transition duration-300 ease-in-out transform hover:scale-110" 
          style={{background: 'none'}} 
        />
        
      </Link>
      
      <div className="links flex justify-center text-red-600 flex-1 text-4xl">Warehouse Management</div>


      <div className="links flex justify-center text-2xl">
        {
          user && (
          <>
          <Link to={"/profile"} className="link text-white hover:text-gray-300 mr-4 transition duration-300 ease-in-out transform hover:scale-110">Profile</Link>
          <div className="divider h-6 bg-white text-2xl"></div>
          <Link to={"/warehouse"} className="link text-white hover:text-gray-300 mx-4 transition duration-300 ease-in-out transform hover:scale-110">Warehouses</Link>
          <div className="divider h-6 bg-white text-2xl"></div>
          </>
          )
        }
      </div>
    </header>
  );
}
