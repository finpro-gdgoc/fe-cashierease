import BgEase from "@/components/BgEase";
import FlipButton from "@/components/ui/FlipButton";
import LogoCashierEase from "@/components/ui/LogoCashierEase";

export default function PreLogin() {
  return (
    <div className="h-screen w-full bg-gray-100 auth-pattern shadow-2xl">
      <div className="mx-auto min-h-screen rounded-lg w-10/12 flex items-center">
        <main className="w-full bg-white rounded-2xl flex justify-center items-center gap-16 relative shadow-2xl">
          <BgEase />
          <div className="absolute top-[150px]">
            <LogoCashierEase />
            <p className="text-xs text-center">
              Kapan lagi ngekasir jadi semudah ini?
            </p>
          </div>
          <FlipButton />
        </main>
      </div>
    </div>
  );
}
