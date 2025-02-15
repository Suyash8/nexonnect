"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DisplayNameInputProps {
  displayName: string;
  setDisplayName: (value: string) => void;
  useUsername: boolean;
  setUseUsername: (value: boolean) => void;
  username: string;
}

export default function DisplayNameInput({
  displayName,
  setDisplayName,
  useUsername,
  setUseUsername,
  username,
}: DisplayNameInputProps) {
  const [displayNameError, setDisplayNameError] = useState("");
  const [displayNameTouched, setDisplayNameTouched] = useState(false);
  const [prevDisplayName, setPrevDisplayName] = useState("");

  useEffect(() => {
    if (useUsername) {
      setDisplayName(username);
      setDisplayNameError("");
    }
  }, [username, useUsername, setDisplayName]);

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

  return (
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
  );
}
