"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const SignUp = () => {
    const { toast } = useToast();
    const [userinfo, setuserinfo] = useState({
        name:"",
        email: "",
        number: "",
        password: "",
    });
    const [loader, setloader] = useState(false);
    const signUpUser = async () => {
        setloader(true);
        if (userinfo.email === "" || userinfo.password === "" || userinfo.name === "" || userinfo.number === "") {
            toast({
                title: "Empty Fields",
                description: "Please fill all the fields to sign in to your account!",
                variant: "destructive"
            });
            setloader(false);
            return;
        }
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
                                setuserinfo((prev) => ({ ...prev, number: e.target.value }))
                            }
                            type="text"
                            placeholder="Number"
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
