"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInUserSchema } from "@/utils/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/user";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userinfo, setuserinfo] = useState({
    email: "",
    password: "",
  });
  const [loader, setloader] = useState(false);


  const loginuser = async () => {
    setloader(true);
    const validateUser = signInUserSchema.safeParse(userinfo);
    if (!validateUser.success) {
      toast({
        title: "Invalid Fields",
        description: validateUser.error.errors[0].message,
        variant: "destructive"
      });
      setloader(false);
      return;
    }

    axios.post("/api/signin", userinfo)
      .then(res => {
        console.log(res)
        if (res.data.status === 200) {
          localStorage.setItem("gift-app-token", res.data.body.data);
          toast({
            title: "User Logged in successfully",
          });
          router.push("/dashboard");
        } else {
          toast({
            title: "Invalid credentials",
            variant: "destructive"
          });
          setloader(false);
        }
      })
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="w-[400px] py-[30px]">
        <CardHeader className="text-center">
          {loader ? (
            <Skeleton className="w-[200px] h-[30px]" />
          ) : (
            <>
              <CardTitle>Login</CardTitle>
              <CardDescription>Ready To invite guests</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {loader ? (
            <Skeleton className="w-full h-[30px]" />
          ) : (
            <Input
              onChange={(e) =>
                setuserinfo((prev) => ({ ...prev, email: e.target.value }))
              }
              type="text"
              placeholder="Email"
            />
          )}
        </CardContent>
        <CardContent>
          {loader ? (
            <Skeleton className="w-full h-[30px]" />
          ) : (
            <Input
              onChange={(e) =>
                setuserinfo((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              placeholder="Password"
            />
          )}
        </CardContent>
        <CardFooter className="py-[20px] flex flex-col">
          {loader ? (
            <Skeleton className="w-full h-[30px]" />
          ) : (
            <>
              <Button
                className="w-full"
                size="default"
                onClick={loginuser}
              >
                SignIn
              </Button>
              <Link
                className="text-center text-[10px] hover:underline cursor-pointer py-[10px]"
                href={`/createuser`}
              >
                Dont have one? Create a new Account!
              </Link>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
