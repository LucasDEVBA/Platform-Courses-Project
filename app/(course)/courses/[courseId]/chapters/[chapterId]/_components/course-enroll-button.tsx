"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Ocorreu um erro!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className={"w-full md:w-auto"}
    >
      Inscreva-se por {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
