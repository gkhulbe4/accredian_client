import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupSchema } from "@/schema";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/lib/globalConstant";

function SignupForm() {
  const [checkbox, setCheckbox] = useState(false);
  const [view, setView] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    if (checkbox === false) {
      toast.info("Please accept the terms and conditions");
      return;
    }
    setIsRegistering(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/user/signup`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success(res.data.message);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
    } finally {
      setIsRegistering(true);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center w-full md:w-[60%]">
      <div className="shadow-xl rounded-lg bg-white w-full md:w-[500px] h-max p-7">
        <Form {...form}>
          <form
            className=" flex flex-col gap-4 max-w-md mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={view ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div
                className="absolute top-2 right-3 w-max text-sm text-gray-400 cursor-pointer"
                onClick={() => setView(!view)}
              >
                {view ? "Hide" : "Show"}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="terms"
                type="checkbox"
                checked={checkbox}
                onClick={() => setCheckbox(!checkbox)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400"
              >
                Accept terms and conditions
              </label>
            </div>
            <Button
              disabled={isRegistering}
              className="bg-[#1c6fe1] font-light text-white px-4 py-2 rounded-lg hover:bg-blue-500 "
              type="submit"
            >
              {isRegistering ? "Registering" : "Register"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignupForm;
