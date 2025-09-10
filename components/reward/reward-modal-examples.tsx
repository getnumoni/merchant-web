"use client";
import { useState } from "react";
import { GiftIcon } from "../common/icon-svg";
import RewardModal from "./reward-modal";

export default function RewardModalExamples() {
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePauseRewards = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setPauseModalOpen(false);
    console.log("Rewards paused");
  };

  const handleResumeRewards = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setResumeModalOpen(false);
    console.log("Rewards resumed");
  };

  const handleDeleteRewards = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setDeleteModalOpen(false);
    console.log("Rewards deleted");
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Reward Modal Examples</h2>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setPauseModalOpen(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Pause Rewards Modal
        </button>

        <button
          onClick={() => setResumeModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Resume Rewards Modal
        </button>

        <button
          onClick={() => setDeleteModalOpen(true)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Delete Rewards Modal
        </button>
      </div>

      {/* Pause Rewards Modal */}
      <RewardModal
        isOpen={pauseModalOpen}
        onClose={() => setPauseModalOpen(false)}
        onConfirm={handlePauseRewards}
        icon={<GiftIcon size={48} className="text-red-500" />}
        iconColor="red"
        title="Pause Rewards?"
        description="Manually stop point allocations to customers until you're ready to resume. Customers will no longer earn points until you reactivate rewards."
        subDescription="Proceed?"
        primaryButtonText="Yes, Pause Rewards"
        secondaryButtonText="No, Keep Rewards"
        primaryButtonVariant="destructive"
        primaryButtonColor="#DC2626"
        secondaryButtonColor="#F3F4F6"
        isLoading={isLoading}
      />

      {/* Resume Rewards Modal */}
      <RewardModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onConfirm={handleResumeRewards}
        icon={<GiftIcon size={48} className="text-green-500" />}
        iconColor="green"
        title="Resume Rewards?"
        description="Reactivate point allocations so customers can start earning again."
        primaryButtonText="Resume Rewards"
        secondaryButtonText="Keep Rewards Paused"
        primaryButtonVariant="default"
        primaryButtonColor="#10B981"
        secondaryButtonColor="#F3F4F6"
        isLoading={isLoading}
      />

      {/* Delete Rewards Modal */}
      <RewardModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteRewards}
        icon={<GiftIcon size={48} className="text-gray-500" />}
        iconColor="gray"
        title="Delete Rewards?"
        description="This action cannot be undone. All reward data will be permanently deleted."
        subDescription="Are you sure you want to continue?"
        primaryButtonText="Yes, Delete"
        secondaryButtonText="Cancel"
        primaryButtonVariant="destructive"
        primaryButtonColor="#6B7280"
        secondaryButtonColor="#F3F4F6"
        isLoading={isLoading}
      />
    </div>
  );
}
