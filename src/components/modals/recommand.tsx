'use client'
import Modal from "./modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import LoadingDots from "@/app/icons/loading-dots";
import { lyrics } from "../../../assets/lyrics.json";
import clsx from "clsx";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

  function useDummyAudio(length: number) {
    const [timestamp, setTimestamp] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTimestamp((prev) => {
          if (prev >= length) {
            clearInterval(interval);
            return length;
          }
          return prev + 500;
        });
      }, 500);
  
      return () => clearInterval(interval);
    }, [length]);
  
    return { timestamp };
  }

  function useCurrentLine(timestamp: number) {
    type Line = (typeof lyrics.lines)[number];
    const [currentLine, setCurrentLine] = useState<Line | null>(null);
  
    useEffect(() => {
      const nextLineIndex = lyrics.lines.findIndex(
        (line) => Number(line.startTimeMs) > timestamp
      );
  
      if (nextLineIndex === 0) {
        setCurrentLine(lyrics.lines[0]);
      }
  
      setCurrentLine(lyrics.lines[nextLineIndex - 1]);
    }, [timestamp]);
  
    return { currentLine };
  }


const RecommendationModal = ({
  showRecommendationModal,
  setShowRecommendationModal,
}: {
  showRecommendationModal: boolean;
  setShowRecommendationModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const [RecommendationClicked, setRecommendationClicked] = useState(false);
    const currentLineRef = useRef<HTMLParagraphElement | null>(null);
    const { timestamp } = useDummyAudio(178000);
    const { currentLine } = useCurrentLine(timestamp);
    
  
    useEffect(() => {
      if (currentLineRef.current) {
        currentLineRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, [currentLine]);
  
  return (
    <Modal showModal={showRecommendationModal} setShowModal={setShowRecommendationModal}>
     <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="">
            <Image
              src="/next.svg"
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </a>
          <h3 className="font-display text-2xl font-bold">First Aid coach</h3>
          <p className="text-sm text-gray-500">
            This is strictly for demo purposes - only when  you are in a real emergency situation should you call an ambulance or first aid service.
            Get a free first aid course with us! This is an introductory video to help you understand the basics of CPR and how
            Are you a first aid trainer? Do you know someone who is? We can help connect you with people in need of your expertise
            Are you a first aid trainer? Do you know someone who is? We need your help to add them to our directory! Please fill
            Get a free first aid course with our app! Just click the button below to get started
          </p>
        </div>  
          <Drawer>
      <DrawerTrigger asChild>
      <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
      <button
            disabled={RecommendationClicked}
            className={`${
                RecommendationClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setRecommendationClicked(true);
              
            }}
          >
            {RecommendationClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <p>get started</p>
              </>
            )}
          </button>
      </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[70vh]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <main className="gap-5 text-left">
      {lyrics.lines.map((line) => {
        const isCurrentLine = currentLine?.startTimeMs === line.startTimeMs;
        const isPastLine = Number(line.startTimeMs) < timestamp;

        return (
          <p
            ref={isCurrentLine ? currentLineRef : null}
            className={clsx(
              `text-2xl font-bold`,
              isCurrentLine
                ? "text-white"
                : isPastLine
                ? "text-gray-400"
                : "text-black"
            )}
            key={line.startTimeMs}
          >
            {line.words}
          </p>
        );
      })}
    </main>
          <DrawerFooter>
            <DrawerClose asChild>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
      </div>
    </Modal>
  );
};

export function useRecommendationModal() {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);

  const RecommendationModalCallback = useCallback(() => {
    return (
      <RecommendationModal
        showRecommendationModal={showRecommendationModal}
        setShowRecommendationModal={setShowRecommendationModal}
      />
    );
  }, [showRecommendationModal, setShowRecommendationModal]);

  return useMemo(
    () => ({ setShowRecommendationModal, RecommendationModal: RecommendationModalCallback }),
    [setShowRecommendationModal, RecommendationModalCallback],
  );
}