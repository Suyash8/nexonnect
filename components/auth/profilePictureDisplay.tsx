"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { createAvatar } from "@dicebear/core";
import { adventurerNeutral } from "@dicebear/collection";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxAvatar } from "react-icons/rx";
import AvatarCustomizer from "./avatarCustomizer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import ProfilePicureUploader from "./profilePicureUploader";
import { Input } from "../ui/input";

export default function ProfilePictureDisplay({
  avatar,
  setAvatar,
}: {
  avatar: string;
  setAvatar: Dispatch<SetStateAction<string>>;
}) {
  const [currentOptions, setCurrentOptions] = useState(randomizeOptions);
  const [imageData, setImageData] = useState<File>();

  const fileRef = useRef<HTMLInputElement>(null);
  const alertRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setAvatar(createAvatar(adventurerNeutral, currentOptions).toDataUri());
  }, [currentOptions]);

  const randomizeAvatar = () => {
    setCurrentOptions(randomizeOptions);
  };

  return (
    <Drawer>
      <AlertDialog>
        <DropdownMenu>
          <div className="flex items-center justify-center w-full">
            <DropdownMenuTrigger className="rounded-full">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={avatar} alt="@shadcn" />
                      <AvatarFallback>
                        <RxAvatar />
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>Profile picture</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={randomizeAvatar}>
                Randomize
              </DropdownMenuItem>
              <DrawerTrigger asChild>
                <DropdownMenuItem>Customize</DropdownMenuItem>
              </DrawerTrigger>
              <DropdownMenuItem onClick={() => fileRef.current?.click()}>
                Select from Device
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileRef}
          onInput={() => {
            if (fileRef.current?.files) setImageData(fileRef.current.files[0]);
            console.log(imageData);
            alertRef.current?.click();
          }}
        />
        <AlertDialogTrigger
          className="hidden"
          ref={alertRef}
        ></AlertDialogTrigger>
        <AvatarCustomizer
          currentOptions={currentOptions}
          setCurrentOptions={setCurrentOptions}
          options={options}
        />
        <ProfilePicureUploader image={imageData} setAvatar={setAvatar} />
      </AlertDialog>
    </Drawer>
  );
}

const randomizeOptions = () => {
  return {
    backgroundColor: [
      options.backgroundColor[
        Math.floor(Math.random() * options.backgroundColor.length)
      ],
    ],
    eyebrows: [
      options.eyebrows[Math.floor(Math.random() * options.eyebrows.length)],
    ],
    eyes: [options.eyes[Math.floor(Math.random() * options.eyes.length)]],
    glasses:
      Math.random() < 0.1
        ? [options.glasses[Math.floor(Math.random() * options.eyes.length)]]
        : undefined,
    mouth: [options.mouth[Math.floor(Math.random() * options.mouth.length)]],
  };
};

const options = {
  backgroundColor: [
    "ffe0bd",
    "f2d3b1",
    "ffcd94",
    "ecad80",
    "d7a77d",
    "c68642",
    "9e5622",
    "8d5524",
    "7c4a23",
    "763900",
    "603420",
  ],
  eyebrows: [
    "variant01",
    "variant02",
    "variant03",
    "variant04",
    "variant05",
    "variant06",
    "variant07",
    "variant08",
    "variant09",
    "variant10",
    "variant11",
    "variant12",
    "variant13",
    "variant14",
    "variant15",
  ] as const,
  eyes: [
    "variant01",
    "variant02",
    "variant03",
    "variant04",
    "variant05",
    "variant06",
    "variant07",
    "variant08",
    "variant09",
    "variant10",
    "variant11",
    "variant12",
    "variant13",
    "variant14",
    "variant15",
    "variant16",
    "variant17",
    "variant18",
    "variant19",
    "variant20",
    "variant21",
    "variant22",
    "variant23",
    "variant24",
    "variant25",
    "variant26",
  ] as const,
  glasses: [
    "variant01",
    "variant02",
    "variant03",
    "variant04",
    "variant05",
  ] as const,
  mouth: [
    "variant01",
    "variant02",
    "variant03",
    "variant04",
    "variant05",
    "variant06",
    "variant07",
    "variant08",
    "variant09",
    "variant10",
    "variant11",
    "variant12",
    "variant13",
    "variant14",
    "variant15",
    "variant16",
    "variant17",
    "variant18",
    "variant19",
    "variant20",
    "variant21",
    "variant22",
    "variant23",
    "variant24",
    "variant25",
    "variant26",
    "variant27",
    "variant28",
    "variant29",
    "variant30",
  ] as const,
};
