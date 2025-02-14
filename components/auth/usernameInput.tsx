"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { IoReloadOutline } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";

interface UsernameInputProps {
  username: string;
  setUsername: (value: string) => void;
  setUsernameTouched: (value: boolean) => void;
  usernameTouched: boolean;
}

export default function UsernameInput({
  username,
  setUsername,
  setUsernameTouched,
  usernameTouched,
}: UsernameInputProps) {
  const [usernameError, setUsernameError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [debouncedUsername] = useDebounce(username, 500);

  useEffect(() => {
    if (!usernameTouched) return;
    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(username)) {
      setUsernameError(
        "Username must be 3-30 characters (letters, numbers, - or _)."
      );
      setUsernameAvailable(false);
    } else {
      setUsernameError("");
    }
  }, [username, usernameTouched]);

  useEffect(() => {
    if (!usernameTouched || usernameError) return;

    fetch(`/api/auth/checkUsername?username=${debouncedUsername}`)
      .then((res) => res.json())
      .then((data) => {
        setUsernameAvailable(data.available);
        if (!data.available) {
          setUsernameError("Username is already taken.");
        }
      });
  }, [debouncedUsername, usernameTouched]);

  return (
    <div className="grid gap-2">
      <Label htmlFor="username">Username</Label>
      <div className="flex items-center gap-2">
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setUsernameTouched(true)}
          required
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                className="aspect-square"
                onClick={() => {
                  const newUsername = uniqueNamesGenerator({
                    dictionaries: [adjectives, animals],
                    separator: "-",
                  });
                  setUsername(newUsername);
                  setUsernameTouched(true);
                }}
              >
                <IoReloadOutline />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Auto-generate username</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {usernameTouched && usernameError && (
        <p className="text-red-500 text-sm">{usernameError}</p>
      )}
      {usernameTouched && usernameAvailable && (
        <p className="text-green-500 text-sm">Username is available!</p>
      )}
    </div>
  );
}
