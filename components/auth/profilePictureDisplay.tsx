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
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxAvatar } from "react-icons/rx";
import AvatarCustomizer from "./avatarCustomizer";

export default function ProfilePictureDisplay() {
  const [currentOptions, setCurrentOptions] = useState(randomizeOptions);
  const [avatar, setAvatar] = useState(
    createAvatar(adventurerNeutral, currentOptions).toDataUri()
  );

  useMemo(() => {
    setAvatar(createAvatar(adventurerNeutral, currentOptions).toDataUri());
  }, [currentOptions]);

  const randomizeAvatar = () => {
    setCurrentOptions(randomizeOptions);
  };

  return (
    <Drawer>
      <DropdownMenu>
        <div className="flex items-center justify-center w-full">
          <DropdownMenuTrigger className="rounded-full">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatar} alt="@shadcn" />
              <AvatarFallback>
                <RxAvatar />
              </AvatarFallback>
            </Avatar>
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

            <DropdownMenuItem>Select from Device</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AvatarCustomizer
        currentOptions={currentOptions}
        setCurrentOptions={setCurrentOptions}
        options={options}
      />
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
  backgroundColor: ["f2d3b1", "ecad80", "9e5622", "763900"],
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
