import { Button } from "@weebapp/ui/button";

export default function Page(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button appName="web-app" className="bg-blue-500">
        Button
      </Button>
    </main>
  );
}
