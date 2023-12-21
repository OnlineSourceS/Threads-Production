"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { RxCross2 } from "react-icons/rx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { ThreadFormData, ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { ObjectId } from "mongoose";
import { uploadFiles } from "@/utils/uploadthing";
import { Flat } from "@alptugidin/react-circular-progress-bar";

import { toast } from "sonner";
import { hasTyped } from "@/lib/utils";
import { UploadFileResponse } from "uploadthing/client";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { RiAttachment2 } from "react-icons/ri";

interface Props {
  userId: { userMongoId: string | ObjectId | null };
}

function PostThread({ userId: { userMongoId } }: Props) {
  const [Isloading, setIsloading] = useState(false);
  const [SelectedImages, setSelectedImages] = useState<
    { src: string; image: File }[]
  >([]);
  const pathname = usePathname();
  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      accountId: userMongoId || null,
      thread: "",
      images: [],
    } as ThreadFormData,
  });
  const router = useRouter();
  useEffect(() => {
    if (!userMongoId) {
      router.push("/sign-up");
    }
    console.log(userMongoId);
  }, []);

  async function onSubmit({
    accountId,
    thread,
    images,
  }: z.infer<typeof ThreadValidation>): Promise<void> {
    if (!hasTyped(thread)) {
      toast.error("Couldn't Post Empty Thread");
      return;
    }
    if (SelectedImages.length > 3) {
      toast.error("Media Image's Limit Exceeded, must be less than 4");
      return;
    }
    let uploadthingImages: UploadFileResponse[] = [];
    setIsloading(true);
    if (SelectedImages.length > 0) {
      uploadthingImages = await uploadFiles({
        endpoint: "imageUploader",
        files: SelectedImages.map(
          (selectedImage) => selectedImage.image
        ) as File[],
      });
    }

    await createThread({
      author: userMongoId as ObjectId,
      threadText: thread,
      community: null,
      path: pathname as string,
      media: uploadthingImages.map((res) => ({ type: "image", url: res.url })),
    });

    setIsloading(false);
    toast.success("Posted New Thread!");
    router.push("/");
  }

  // Handle file input change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files);
    const images = files.map((file) => ({
      src: URL.createObjectURL(file),
      image: file,
    }));
    setSelectedImages(images);
  };
  function handleImageRemoval(index: number) {
    const updatedImages = [...SelectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  }

  function handleThreadTextChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
    threadFieldChange: (...event: any[]) => void,
    value: string
  ) {
    const { value: eValue } = e.target;
    if (value.length < 50) {
      threadFieldChange(eValue);
    } else {
      toast.message("Reached The Maximum limit Of Threads");
    }
  }
  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    threadFieldChange: (...event: any[]) => void,
    value: string
  ) {
    if (event.key === "Backspace") {
      event.preventDefault();
      threadFieldChange(value.slice(0, value.length - 1));
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">
                  Connect The Whole World By Threading Them
                </FormLabel>
                <FormControl className="">
                  <Textarea
                    className="text-xl focus-visible:ring-0"
                    unselectable="on"
                    placeholder="Write Your Own Thread"
                    {...field}
                    onKeyDown={(e) =>
                      handleKeyDown(e, field.onChange, field.value)
                    }
                    onChange={(e) => {
                      handleThreadTextChange(e, field.onChange, field.value);
                    }}
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription className="">
                    <span
                      className={`transition-all ${
                        form.getValues("thread").length
                          ? "text-white scale-125 text-lg"
                          : "scale-80 text-md"
                      } font-light`}
                    >
                      ({form.getValues("thread").length}/50)
                    </span>{" "}
                    <span>Make Others Listen Your Voice </span>
                  </FormDescription>

                  <span className="scale-125 h-10 w-10 mt-1">
                    <Flat
                      progress={(100 * form.getValues("thread").length) / 50}
                      // showMiniCircle={true}
                      sx={{
                        bgStrokeColor: "#dbdbdb",
                        shape: "full",
                        strokeColor: "#8168df",
                        loadingTime: 450,
                        barWidth: 7,
                        valueWeight: "bolder",
                        valueColor: "#c2c2c2",
                        valueFamily: "Helvetica",
                        textWeight: "bolder",
                        miniCircleColor: "white",
                      }}
                    />
                  </span>
                </div>
                <RadioGroup defaultValue="comfortable">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3"> Private </Label>
                    <span className="text-neutral-400 text-xs">
                      (Only For Followers)
                    </span>
                  </div>
                </RadioGroup>{" "}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Choose Images</FormLabel>
                <FormControl className="">
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      id="input-image"
                      multiple
                      placeholder="Select Images For The Post"
                      {...field}
                      className="opacity-0"
                      onChange={(e) => handleImageChange(e)} // Handle file input change
                    />
                    <Label id="input-image" htmlFor="input-image">
                      <a className="hover:underline flex gap-1 cursor-pointer">
                        <RiAttachment2 />
                        <span>Attach</span>
                      </a>
                    </Label>
                  </>
                </FormControl>

                <FormDescription>
                  {" "}
                  Upload Media as Moments Related To Your Thread
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className={`flex gap-2 ${
              form.getValues().thread.length === 0
                ? "bg-[#776ef7c5]"
                : "bg-[#7a71fc]"
            } px-6 transition-all py-3 hover:bg-[#776ef7c5] rounded-2xl `}
            disabled={Isloading || form.getValues().thread.length === 0}
          >
            <span>{Isloading ? "Posting" : "Thread"}</span>
            <span>
              {Isloading ? (
                <Loader2Icon className="animate-spin" size={22} />
              ) : (
                // <PlusIcon />
                <></>
              )}
            </span>
          </button>
        </form>
      </Form>
      <div className="">
        {SelectedImages.length > 0 && (
          <div>
            <h3 className="text-xl font-normal  mt-12">Selected Images:</h3>
            <div className="images flex flex-wrap  items-start justify-evenly">
              {SelectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[44%] transition-all cursor-pointer"
                >
                  <button
                    onClick={() => handleImageRemoval(index)}
                    className="relative top-[3.4rem] left-2 z-10 bg-gray-500 bg-opacity-70 hover:bg-opacity-90 transition-all px-3 py-2 rounded-full"
                  >
                    <RxCross2 className="h-7 w-7" />
                  </button>
                  <img
                    src={image.src}
                    className="w-full rounded-xl hover:opacity-95 object-contain"
                    alt={`Image-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostThread;
