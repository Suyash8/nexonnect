"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useCallback } from "react";
import { IoReloadOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { useSession } from "next-auth/react";
import { useDebounce } from "use-debounce";

function WelcomePageForm() {
  const { data: session, status } = useSession();
  const [useUsername, setUseUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [prevDisplayName, setPrevDisplayName] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  const [usernameTouched, setUsernameTouched] = useState(false);
  const [displayNameTouched, setDisplayNameTouched] = useState(false);

  const [debouncedUsername] = useDebounce(username, 500);

  // Fetch existing username when user is authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetch(`/api/auth/getUsername?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            data.username = data.username.substring(0, 30);
            setUsername(data.username);
            setDisplayName(data.username);
          }
        });
    }
  }, [session, status]);

  // Validate username format
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

  // Validate display name format
  useEffect(() => {
    if (!displayNameTouched || useUsername) return;
    if (!/^[a-zA-Z0-9_\- ]{3,30}$/.test(displayName)) {
      setDisplayNameError(
        "Display name must be 3-30 characters (letters, numbers, spaces)."
      );
    } else {
      setDisplayNameError("");
    }
  }, [displayName, displayNameTouched, useUsername]);

  // Debounced API call to check username availability
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

  // Sync display name with username when checkbox is checked
  useEffect(() => {
    if (useUsername) {
      setDisplayName(username);
      setDisplayNameError("");
    }
  }, [username, useUsername]);

  return (
    <form>
      <div className="grid gap-6">
        {/* Username Input */}
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
                      if (useUsername) setDisplayName(newUsername);
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

        {/* Display Name Input */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="display-name">Display Name</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="same-as-username"
                checked={useUsername}
                onCheckedChange={(checked) => {
                  setUseUsername(checked as boolean);
                  if (checked) {
                    setPrevDisplayName(displayName);
                    setDisplayName(username);
                    setDisplayNameTouched(false);
                    setDisplayNameError("");
                  } else {
                    setDisplayName(prevDisplayName);
                  }
                }}
              />
              <Label htmlFor="same-as-username">Same as username</Label>
            </div>
          </div>
          <Input
            id="display-name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            onBlur={() => setDisplayNameTouched(true)}
            disabled={useUsername}
            required
          />
          {displayNameTouched && displayNameError && (
            <p className="text-red-500 text-sm">{displayNameError}</p>
          )}
        </div>
      </div>
    </form>
  );
}

export default WelcomePageForm;
