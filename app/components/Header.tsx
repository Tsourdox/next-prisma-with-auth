import SignInOutButton from "./SignInOutButton";

export default async function Header() {
  return (
    <header className="flex justify-between p-4 bg-slate-200">
      <h1>Postworld</h1>
      <SignInOutButton />
    </header>
  );
}
