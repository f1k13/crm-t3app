import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { useEdit } from "~/entities/user/hooks/use-edit";
import { useUserStore } from "~/entities/user/model/store";
import {
  userEditSchema,
  type TUserEditType,
  type UserFormValues,
} from "~/entities/user/model/user.model";
import { RoleEnum } from "~/server/api/enums/role-enum";
import UserForm from "~/widgets/users/ui/user-form";

const UserEditForm = ({ onClose }: { onClose: () => void }) => {
  const { user } = useUserStore((state) => state);
  const form = useForm<TUserEditType>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      id: user?.id,
      role: user?.role ?? RoleEnum.KM,
      email: user?.email ?? "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      middleName: user?.middleName ?? "",
    },
  });

  const edit = useEdit({
    onSuccess: onClose,
  });

  const submit = (data: UserFormValues) => {
    edit.mutate(data as TUserEditType);
  };

  return (
    <UserForm
      handleSubmit={submit}
      form={form as UseFormReturn<UserFormValues>}
      requireLogin={false}
      renderButton={() => (
        <Button color={"primary"} className={"w-full"} type={"submit"}>
          Редактировать
        </Button>
      )}
    />
  );
};

export default UserEditForm;
