import WelcomePageForm from "@/components/auth/welcome-page-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function WelcomeScreen() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-black p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Just some quick setup</CardDescription>
        </CardHeader>
        <CardContent>
          <WelcomePageForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default WelcomeScreen;
