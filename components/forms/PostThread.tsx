"use client";
import React, { ChangeEvent, use, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname, useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.action";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

type Props = {
  userId: string;
};

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      content: values.thread,
      author: userId,
      communityId: organization?.id || null,
      path: pathname,
    });
    router.push("/");
  };

  return (
    <>
      {" "}
      <div className="bg-light-1 rounded-lg flex flex-col p-4">
        <div className="border-b-[2px] border-neutral-200 pb-2">
          <div className="flex justify-center items-start gap-2">
            <div className="h-11 w-11 relative">
              <Image
                src="/assets/user.png"
                alt="user"
                fill
                className="rounded-full"
              />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grow h-full flex justify-center items-start gap-2"
              >
                <FormField
                  control={form.control}
                  name="thread"
                  render={({ field }) => (
                    <FormItem className="grow flex gap-2 items-center justify-between ">
                      <FormControl className="no-focus border rounded-xl bg-[#ECE6EB] grow">
                        <Textarea
                          rows={2}
                          {...field}
                          placeholder="What's on your mind?"
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="py-2 px-4 rounded-xl h-full bg-[#E5F1FF] text-base-semibold text-primary-500"
                >
                  Post
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostThread;
