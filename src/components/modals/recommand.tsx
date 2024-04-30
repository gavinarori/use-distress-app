'use client'
import Modal from "./modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import LoadingDots from "@/app/icons/loading-dots";



const RecommendationModal = ({
  showRecommendationModal,
  setShowRecommendationModal,
}: {
  showRecommendationModal: boolean;
  setShowRecommendationModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const [RecommendationClicked, setRecommendationClicked] = useState(false);
  
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