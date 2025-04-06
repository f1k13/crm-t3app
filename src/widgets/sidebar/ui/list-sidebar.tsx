"use client";

import Link from "next/link";
import type { TSidebar } from "../model/sidebar";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";

const ListSidebar = ({ list }: { list: TSidebar[] }) => {
  const path = usePathname();

  return (
    <>
      {list.map(({ title, icon, link }) => (
        <Link href={link} key={title} className={"w-full"}>
          <Button
            className={"flex w-full justify-start"}
            key={link}
            color={path === link ? "primary" : "default"}
          >
            {icon}
            <span>{title}</span>
          </Button>
        </Link>
      ))}
    </>
  );
};

export default ListSidebar;
