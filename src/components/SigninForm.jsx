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
import { signinSchema } from "@/schema";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import BASE_URL from "@/lib/globalConstant";

function SigninForm() {
  const [view, setView] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    const email = data.email;
    const password = data.password;

    try {
      const res = await axios.post(
        `${BASE_URL}/user/signin`,
        {
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

            <Button
              className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 "
              type="submit"
            >
              Signin
            </Button>
            <p className="text-sm">
              Dont have an account?{" "}
              <span
                className="cursor-pointer hover:underline text-gray-400"
                onClick={() => navigate("/signup")}
              >
                Click here to register
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SigninForm;
