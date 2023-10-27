import { FileBarChart } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  open: boolean;
};

const ReportsModuleMenu = ({ open }: Props) => {
  const pathname = usePathname();
  const isPath = pathname.includes("reports");
  return (
    <div className={`flex flex-row items-center mx-auto p-2`}>
      <Link
        href={"/reports"}
        className={`flex gap-2 p-2 ${isPath ? "text-muted-foreground" : null}`}
      >
        <FileBarChart className={`w-6 `} />
        <span className={open ? "" : "hidden"}>Reports</span>
      </Link>
    </div>
  );
};

export default ReportsModuleMenu;
