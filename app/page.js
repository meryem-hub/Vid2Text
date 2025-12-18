import { Heading1 } from "lucide-react";
import Header from '@/components/Header';
import VideoComponent from '@/components/VideoComponent'
import Features from "@/components/Features";
export default function Home() {
  return (
  <div>
    <Header />
        <VideoComponent/> 
        <Features />
  </div>

  );
}
