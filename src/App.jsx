import { Button } from "./components/ui/button";
import toast from "react-hot-toast";

function App() {
  return (
    <div className="w-screen h-screen bg-teal-500 flex items-center justify-center">
      <Button onClick={() => toast.success("Hello")}>Click me</Button>
    </div>
  );
}

export default App;
