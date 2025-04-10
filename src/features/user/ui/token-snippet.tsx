import { Button } from "@heroui/react";
import { Copy } from "lucide-react";

const TokenSnippet = ({ token }: { token: string }) => {
  return (
    <div>
      <Button
        color="secondary"
        variant={"solid"}
        onClick={() => navigator.clipboard.writeText(token)}
      >
        Скопировать ссылку <Copy />
      </Button>
    </div>
  );
};

export default TokenSnippet;
