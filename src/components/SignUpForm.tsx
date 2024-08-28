"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpUserSchema } from "@/utils/schema";
import axios from "axios"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "./ui/use-toast";
import { setUser } from "@/store/slices/user";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";

const SignUp = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [userinfo, setuserinfo] = useState({
        name: "",
        email: "",
        mobile: "",
        city: "",
        password: "",
    });
    const [loader, setloader] = useState(false);
    const signUpUser = async () => {
        setloader(true);
        // Add zod validations  here
        const validateUser = signUpUserSchema.safeParse(userinfo);
        if (!validateUser.success) {
            toast({
                title: "Invalid Fields",
                description: validateUser.error.errors[0].message,
                variant: "destructive"
            });
            setloader(false);
            return;
        }

        axios.post('/api/signup', userinfo)
            .then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem("gift-app-token", res.data.body.data);
                    toast({
                        title: "User Created",
                    });
                    router.push('/dashboard');
                } else {
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
                            <CardTitle>Create Account</CardTitle>
                            <CardDescription>Create Invitations</CardDescription>
                        </>
                    )}
                </CardHeader>
                {/* Name */}
                <CardContent>
                    {loader ? (
                        <Skeleton className="w-full h-[30px]" />
                    ) : (
                        <Input
                            onChange={(e) =>
                                setuserinfo((prev) => ({ ...prev, name: e.target.value }))
                            }
                            type="text"
                            placeholder="Name"
                        />
                    )}
                </CardContent>
                {/* Email */}
                <CardContent>
                    {loader ? (
                        <Skeleton className="w-full h-[30px]" />
                    ) : (
                        <Input
                            onChange={(e) =>
                                setuserinfo((prev) => ({ ...prev, email: e.target.value }))
                            }
                            type="email"
                            placeholder="Email"
                        />
                    )}
                </CardContent>
                {/* Number */}
                <CardContent>
                    {loader ? (
                        <Skeleton className="w-full h-[30px]" />
                    ) : (
                        <Input
                            onChange={(e) =>
                                setuserinfo((prev) => ({ ...prev, mobile: e.target.value }))
                            }
                            type="text"
                            placeholder="Mobile Number"
                        />
                    )}
                </CardContent>
                {/* City */}
                <CardContent>
                    {loader ? (
                        <Skeleton className="w-full h-[30px]" />
                    ) : (
                        <Input
                            onChange={(e) =>
                                setuserinfo((prev) => ({ ...prev, city: e.target.value }))
                            }
                            type="text"
                            placeholder="City"
                        />
                    )}
                </CardContent>
                {/* password */}
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
                                onClick={signUpUser}
                            >
                                SignUp
                            </Button>
                        </>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUp;
