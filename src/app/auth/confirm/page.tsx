"use client";

import { Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Progress } from "@heroui/react";
import { useVerifyAuth } from "~/features/auth/hooks/use-verify-auth";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const confirm = useVerifyAuth();
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending",
  );
  const [message, setMessage] = useState("");
  const [isCalled, setIsCalled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Токен не найден в ссылке.");
      return;
    }

    if (!isCalled) {
      confirm.mutate(
        { token },
        {
          onSuccess(data) {
            setStatus("success");
            setMessage(data.message);
          },
          onError(error) {
            setStatus("error");
            setMessage(error.message);
          },
        },
      );
      setIsCalled(true);
    }
  }, [token, isCalled]);

  if (status === "pending") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="text-lg font-medium">Подтверждаем ваш аккаунт...</p>
        <p className="text-sm text-gray-500">
          Пожалуйста, подождите. Это займёт пару секунд.
        </p>
        <div className="w-full max-w-sm">
          <Progress isIndeterminate color="primary" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
        <XCircle className="h-10 w-10 text-red-500" />
        <p className="text-lg font-medium text-red-600">
          Ошибка при подтверждении
        </p>
        <p className="text-sm text-gray-500">{message}</p>
        <Button variant="solid" onClick={() => router.push("/auth/sign-in")}>
          Перейти к авторизации
        </Button>
      </div>
    );
  }

  return null;
};

export default Page;
