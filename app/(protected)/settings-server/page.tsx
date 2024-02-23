import { auth, signOut } from "@/auth";

export default async function SettingsServer() {
  const logIn = await auth();

  return (
    <div>
      {JSON.stringify(logIn)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
