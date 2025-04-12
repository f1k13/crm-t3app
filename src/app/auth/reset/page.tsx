import { AuthTemplate } from "~/app/_templates/auth";
import ResetForm from "../_components/reset-form";

const Page = () => {
  return (
    <AuthTemplate title={"Изменения пароля"}>
      <ResetForm />
    </AuthTemplate>
  );
};

export default Page;
