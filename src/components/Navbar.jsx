import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { NavItems } from "./NavItems";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="py-2 px-5 flex justify-center items-center shadow-lg">
      <div className="w-full lg:w-[80%] flex flex-col gap-3 lg:flex-row lg:gap-0 justify-between items-center">
        <div>
          <p className="font-medium text-[#0a2fff] text-lg">accredian</p>
        </div>
        {user && <NavItems />}
        {user ? (
          <div>
            <Button
              variant={"destructive"}
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button
              variant={"myBtn"}
              onClick={() => {
                navigate("/signin");
              }}
            >
              Login
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
