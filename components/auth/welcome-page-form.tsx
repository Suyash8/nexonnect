"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UsernameInput from "./usernameInput";
import DisplayNameInput from "./displayNameInput";
import ProfilePictureDisplay from "./profilePictureDisplay";

export default function WelcomePageForm() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [useUsername, setUseUsername] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);

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
        <ProfilePictureDisplay />
        <UsernameInput
          username={username}
          setUsername={setUsername}
          setUsernameTouched={setUsernameTouched}
          usernameTouched={usernameTouched}
        />
        <DisplayNameInput
          displayName={displayName}
          setDisplayName={setDisplayName}
          useUsername={useUsername}
          setUseUsername={setUseUsername}
          username={username}
        />
      </div>
    </form>
  );
}
