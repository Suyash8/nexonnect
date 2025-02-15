"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UsernameInput from "./usernameInput";
import DisplayNameInput from "./displayNameInput";
import ProfilePictureDisplay from "./profilePictureDisplay";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function WelcomePageForm() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [useUsername, setUseUsername] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const router = useRouter();

  // Validate username format
  const validateUsername = (username: string) => {
    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(username)) {
      setUsernameError(
        "Username must be 3-30 characters (letters, numbers, - or _)."
      );
      setUsernameAvailable(false);
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };

  // Validate if username is taken
  const validateUsernameTaken = (username: string) => {
    return fetch(`/api/auth/checkUsername?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUsernameAvailable(data.available);
        if (!data.available) {
          setUsernameError("Username is already taken.");
          return false;
        }
        return true;
      });
  };

  // Validate display name format
  const validateDisplayName = (
    displayName: string,
    setDisplayNameError: Dispatch<SetStateAction<string>>
  ) => {
    if (!/^[a-zA-Z0-9_\- ]{3,30}$/.test(displayName)) {
      setDisplayNameError(
        "Display name must be 3-30 characters (letters, numbers, spaces)."
      );
      return false;
    } else {
      setDisplayNameError("");
      return true;
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const validateForm = async () => {
    setFormSubmitted(true);

    const isUsernameValid = validateUsername(username);
    const isDisplayNameValid = validateDisplayName(
      displayName,
      setDisplayNameError
    );

    if (!isUsernameValid || !isDisplayNameValid) return;

    const isUsernameAvailable = await validateUsernameTaken(username);
    if (!isUsernameAvailable) return;

    console.log("Form is valid! Submitting...");

    let base64Image = avatar; // Default to current value

    if (avatar.startsWith("blob:")) {
      try {
        const blob = await fetch(avatar).then((res) => res.blob());
        base64Image = await blobToBase64(blob);
      } catch (error) {
        console.error("Error converting blob to base64:", error);
        return;
      }
    }

    try {
      const response = await fetch("/api/auth/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          username,
          name: displayName,
          image: base64Image, // Now a valid base64 string
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error updating user:", data.error);
        return;
      }

      console.log("User updated successfully:", data);
      router.push("/app");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetch(`/api/auth/getUsername?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            data.username = data.username.substring(0, 30);
            setUsername(data.username);
          }
        });
    }
  }, [session, status]);

  return (
    <form>
      <div className="grid gap-6">
        <ProfilePictureDisplay avatar={avatar} setAvatar={setAvatar} />
        <UsernameInput
          username={username}
          setUsername={setUsername}
          setUsernameTouched={setUsernameTouched}
          usernameTouched={usernameTouched}
          usernameError={usernameError}
          setUsernameError={setUsernameError}
          usernameAvailable={usernameAvailable}
          setUsernameAvailable={setUsernameAvailable}
          formSubmitted={formSubmitted}
        />
        <DisplayNameInput
          displayName={displayName}
          setDisplayName={setDisplayName}
          useUsername={useUsername}
          setUseUsername={setUseUsername}
          username={username}
          validateDisplayName={validateDisplayName}
          formSubmitted={formSubmitted}
          displayNameError={displayNameError}
          setDisplayNameError={setDisplayNameError}
        />
        <Button type="button" onClick={validateForm}>
          Submit
        </Button>
      </div>
    </form>
  );
}
