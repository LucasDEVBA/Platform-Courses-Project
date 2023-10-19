"use client";

import axios from "axios";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useConfettiStore } from "@/hooks/use-confetti-sotre";
import { Button } from "@/components/ui/button";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progresso atualizado");
      router.refresh();
    } catch (error) {
      toast.error("Ocorreu um erro");
      console.log(nextChapterId);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;
  return (
    <Button
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
      onClick={onClick}
      disabled={isLoading}
    >
      {isCompleted ? "Não concluído" : "Marcar como concluído"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};

export default CourseProgressButton;
