'use client'
import Modal from "./modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useRecommendationModal } from "./recommand";
import { useToast } from "@/components/ui/use-toast"

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const { RecommendationModal, setShowRecommendationModal } = useRecommendationModal();
  
  const cancelLocation = async () => {
    try {
      const response = await fetch('/api/signal/put', {
        method: 'PUT',
      });
  
      if (response.ok) {
        console.log('Location cancelled successfully');
        toast({
          description: 'Location cancelled successfully',
        });
      } else {
        console.warn(response.status);
        toast({
          variant: 'destructive',
          description: 'Unexpected status code',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        description: 'Failed to cancel location',
      });
    }
  };
  


  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
    <div className=" overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
      <RecommendationModal/>
         <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All of your data will be permanently
                          removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-2">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setShowRecommendationModal(true)}
                  >
                    Continue
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={cancelLocation}
                  >
                    Cancel
                  </button>
                </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}