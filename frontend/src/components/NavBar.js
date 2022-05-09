import { Group, UnstyledButton } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../application/middlewares/auth";

function MyNavBar() {

  const token = useSelector(state => state?.auth?.token)
  const dispatch = useDispatch()
  
  return (
    <div className=" flex bg-blue-400 h-16 px-12 justify-between items-center ">
        <Link to = "/" className="hover:text-red-600">
            Страница с постами
        </Link>
        {!token ?
          <Link to = "/login" className="hover:text-red-600">
            Авторизация
          </Link>
        : 
        <p onClick={()=>dispatch(Logout())} className="cursor-pointer hover:text-red-600 ">
          Wyhod
        </p>
        }
        
    </div>
  );
}

export default MyNavBar