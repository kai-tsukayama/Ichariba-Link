import Header from "@/components/organisms/Header";
import Navigation from "@/components/organisms/Navigation";
import SubHeader from "@/components/atoms/SubHeader"
import Image from "next/image";
import MessageInput from "@/components/atoms/MessageInput";
import MessageField from "@/components/ui/MessageField";
import HomePage from "./home/page";
import EventDetails from "./events/[id]/page";
import Login from "./login/page";
import SignIn from "./signin/page";
import Messages from "./messages/page";
import EventGenerate from "./events/create/page";


export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}
