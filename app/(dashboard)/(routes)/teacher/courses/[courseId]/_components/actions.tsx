"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-sotre";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const Actions = ({
  disabled,
  courseId,

  isPublished,
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Curso em rascunho");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Curso publicado");
        confetti.onOpen();
      }
      router.refresh();
    } catch (error) {
      toast.error("Ocorreu um erro!");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Curso deletado");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Ocorreu um erro!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={isLoading}
        variant={"outline"}
        size="sm"
      >
        {isPublished ? "Em rascunho" : "Publicar"}
      </Button>
      <ConfirmModal
        onConfirm={onDelete}
        title="Tem certeza?"
        description="Essa ação não pode ser desfeita"
      >
        <Button size={"sm"} disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Actions;
