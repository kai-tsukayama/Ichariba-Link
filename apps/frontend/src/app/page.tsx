import Header from "@/components/organisms/Header";
import Navigation from "@/components/organisms/Navigation";
import SubHeader from "@/components/atoms/SubHeader"
import Image from "next/image";
import MessageInput from "@/components/atoms/MessageInput";
import MessageField from "@/components/ui/MessageField";
import MessageDetails from "./pages/MessageDetails";
import HomePage from "./pages/HomePage";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Messages from "./pages/Messages";
import EventGenerate from "./pages/EventGenerate";


export default function Home() {
  return (
    <div>
      <MessageDetails />
      {/* <HomePage /> */}
      {/* <EventDetails /> */}
      {/* <Login /> */}
      {/* <SignIn /> */}
      {/* <Messages /> */}
      {/* <EventGenerate /> */}
    </div>
  );
}
