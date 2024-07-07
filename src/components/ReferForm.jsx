import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { refFormSchema } from "@/schema";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import BASE_URL from "@/lib/globalConstant";

export function ReferForm() {
  const { user } = useContext(AuthContext);
  const [isReferring, setReferring] = useState(false);
  async function fetchCourses() {
    try {
      const res = await axios.get(`${BASE_URL}/course`);
      return res.data.courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw new Error("Failed to fetch courses");
    }
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const form = useForm({
    resolver: zodResolver(refFormSchema),
    defaultValues: {
      email: "",
      course: "",
    },
  });
  // console.log(user);

  async function onSubmit(formData) {
    try {
      setReferring(true);
      const courseId = data.find((d) => d.title === formData.course).id;
      const res = await axios.post(`${BASE_URL}/course/refer`, {
        courseId: courseId,
        courseTitle: formData.course,
        referrerId: user.id,
        referrerEmail: user.email,
        refereeEmail: formData.email,
      });
      toast.success(res.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.error("Form submission error:", error);
    } finally {
      setReferring(false);
    }
  }

  if (isError) {
    return <div>Error loading courses.</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 max-w-md mx-auto"
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

          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.map((course) => (
                        <SelectItem key={course.id} value={course.title}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button
            disabled={isReferring}
            className="bg-[#1c6fe1] font-light text-white px-6 py-2 rounded-lg hover:bg-blue-500 w-full"
            type="submit"
          >
            {isReferring ? "Sending mail" : "Refer"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
