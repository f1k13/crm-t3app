import { AuthTemplate } from "~/shared/ui/templates/auth";
import AuthForm from "../_components/auth-form";

const Page = () => {
  return (
    <AuthTemplate title={"Логин"}>
      <AuthForm />
    </AuthTemplate>
  );
};

export default Page;
