"use client";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { RxAvatar } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { adventurerNeutral } from "@dicebear/collection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui/card";
import { createAvatar } from "@dicebear/core";
import { ScrollArea } from "../ui/scroll-area";

type OptionsType = {
  backgroundColor: string[];
  eyebrows: readonly [
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
    "variant15"
  ];
  eyes: readonly [
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
    "variant26"
  ];
  glasses: readonly [
    "variant01",
    "variant02",
    "variant03",
    "variant04",
    "variant05"
  ];
  mouth: readonly [
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
    "variant30"
  ];
};
type CurrentOptionsType = {
  backgroundColor: string[];
  eyebrows: (
    | "variant01"
    | "variant02"
    | "variant03"
    | "variant04"
    | "variant05"
    | "variant06"
    | "variant07"
    | "variant08"
    | "variant09"
    | "variant10"
    | "variant11"
    | "variant12"
    | "variant13"
    | "variant14"
    | "variant15"
  )[];
  eyes: (
    | "variant01"
    | "variant02"
    | "variant03"
    | "variant04"
    | "variant05"
    | "variant06"
    | "variant07"
    | "variant08"
    | "variant09"
    | "variant10"
    | "variant11"
    | "variant12"
    | "variant13"
    | "variant14"
    | "variant15"
    | "variant16"
    | "variant17"
    | "variant18"
    | "variant19"
    | "variant20"
    | "variant21"
    | "variant22"
    | "variant23"
    | "variant24"
    | "variant25"
    | "variant26"
  )[];

  glasses:
    | ("variant01" | "variant02" | "variant03" | "variant04" | "variant05")[]
    | undefined;

  mouth: (
    | "variant01"
    | "variant02"
    | "variant03"
    | "variant04"
    | "variant05"
    | "variant06"
    | "variant07"
    | "variant08"
    | "variant09"
    | "variant10"
    | "variant11"
    | "variant12"
    | "variant13"
    | "variant14"
    | "variant15"
    | "variant16"
    | "variant17"
    | "variant18"
    | "variant19"
    | "variant20"
    | "variant21"
    | "variant22"
    | "variant23"
    | "variant24"
    | "variant25"
    | "variant26"
    | "variant27"
    | "variant28"
    | "variant29"
    | "variant30"
  )[];
};

function AvatarCustomizer({
  currentOptions,
  setCurrentOptions,
  options,
}: {
  currentOptions: CurrentOptionsType;
  setCurrentOptions: Dispatch<SetStateAction<CurrentOptionsType>>;
  options: OptionsType;
}) {
  const [avatarOptions, setAvatarOptions] = useState(currentOptions);

  useMemo(() => setAvatarOptions(currentOptions), [currentOptions]);

  function DisplayAvatar({
    avatarOptions,
    selected = false,
  }: {
    avatarOptions: CurrentOptionsType;
    selected?: boolean;
  }) {
    return (
      <Avatar
        className={`w-20 h-20 ${selected ? "border-2 border-blue-400" : ""}`}
      >
        <AvatarImage
          src={createAvatar(adventurerNeutral, avatarOptions).toDataUri()}
          alt="avatar"
        />
        <AvatarFallback>
          <RxAvatar />
        </AvatarFallback>
      </Avatar>
    );
  }
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-xl">
        <DrawerHeader>
          <DrawerTitle>Make your own avatar</DrawerTitle>
          <DrawerDescription>
            Customize your avatar to your liking.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col items-center gap-4 p-4">
          <DisplayAvatar avatarOptions={avatarOptions} />
          <Tabs defaultValue="skin" className="w-full">
            <TabsList className="w-full justify-evenly">
              <TabsTrigger className="w-full" value="skin">
                Skin Color
              </TabsTrigger>
              <TabsTrigger className="w-full" value="eyebrows">
                Eyebrows
              </TabsTrigger>
              <TabsTrigger className="w-full" value="eyes">
                Eyes
              </TabsTrigger>
              <TabsTrigger className="w-full" value="glasses">
                Glasses
              </TabsTrigger>
              <TabsTrigger className="w-full" value="mouth">
                Mouth
              </TabsTrigger>
            </TabsList>
            <TabsContent value="skin">
              <Card className="flex flex-wrap gap-x-6 gap-y-16 p-8 justify-around">
                <ScrollArea className="h-72">
                  {options.backgroundColor.map((color) => (
                    <Button
                      key={color}
                      className="w-25 h-25"
                      variant="link"
                      onClick={() =>
                        setAvatarOptions({
                          ...avatarOptions,
                          backgroundColor: [color],
                        })
                      }
                    >
                      <DisplayAvatar
                        selected={color === avatarOptions.backgroundColor[0]}
                        avatarOptions={{
                          ...avatarOptions,
                          backgroundColor: [color],
                        }}
                      />
                    </Button>
                  ))}
                </ScrollArea>
              </Card>
            </TabsContent>
            <TabsContent value="eyebrows">
              <Card className="flex flex-wrap gap-x-6 gap-y-16 p-8 justify-around">
                <ScrollArea className="h-72">
                  {options.eyebrows.map((eyebrow) => (
                    <Button
                      key={eyebrow}
                      className="w-25 h-25"
                      variant="link"
                      onClick={() =>
                        setAvatarOptions({
                          ...avatarOptions,
                          eyebrows: [eyebrow],
                        })
                      }
                    >
                      <DisplayAvatar
                        selected={eyebrow === avatarOptions.eyebrows[0]}
                        avatarOptions={{
                          ...avatarOptions,
                          eyebrows: [eyebrow],
                        }}
                      />
                    </Button>
                  ))}
                </ScrollArea>
              </Card>
            </TabsContent>
            <TabsContent value="eyes">
              <Card className="flex flex-wrap gap-x-6 gap-y-16 p-8 justify-around">
                <ScrollArea className="h-72">
                  {options.eyes.map((eye) => (
                    <Button
                      key={eye}
                      className="w-25 h-25"
                      variant="link"
                      onClick={() =>
                        setAvatarOptions({
                          ...avatarOptions,
                          eyes: [eye],
                        })
                      }
                    >
                      <DisplayAvatar
                        selected={eye === avatarOptions.eyes[0]}
                        avatarOptions={{
                          ...avatarOptions,
                          eyes: [eye],
                        }}
                      />
                    </Button>
                  ))}
                </ScrollArea>
              </Card>
            </TabsContent>
            <TabsContent value="glasses">
              <Card className="flex flex-wrap gap-x-6 gap-y-16 p-8 justify-around">
                <ScrollArea className="h-72">
                  {options.glasses.map((glass) => (
                    <Button
                      key={glass}
                      className="w-25 h-25"
                      variant="link"
                      onClick={() =>
                        setAvatarOptions({
                          ...avatarOptions,
                          glasses: [glass],
                        })
                      }
                    >
                      <DisplayAvatar
                        selected={
                          avatarOptions.glasses
                            ? glass === avatarOptions.glasses[0]
                            : false
                        }
                        avatarOptions={{
                          ...avatarOptions,
                          glasses: [glass],
                        }}
                      />
                    </Button>
                  ))}
                </ScrollArea>
              </Card>
            </TabsContent>
            <TabsContent value="mouth">
              <Card className="flex flex-wrap gap-x-6 gap-y-16 p-8 justify-around">
                <ScrollArea className="h-72">
                  {options.mouth.map((color) => (
                    <Button
                      key={color}
                      className="w-25 h-25"
                      variant="link"
                      onClick={() =>
                        setAvatarOptions({
                          ...avatarOptions,
                          mouth: [color],
                        })
                      }
                    >
                      <DisplayAvatar
                        selected={color === avatarOptions.mouth[0]}
                        avatarOptions={{
                          ...avatarOptions,
                          mouth: [color],
                        }}
                      />
                    </Button>
                  ))}
                </ScrollArea>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <DrawerFooter className="flex flex-row w-full">
          <DrawerClose asChild>
            <Button className="w-full" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button
              onClick={() => setCurrentOptions(avatarOptions)}
              className="w-full"
            >
              Submit
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}

export default AvatarCustomizer;
