import { storeIcon } from "@/constant/icons";
import Image from "next/image";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface BranchFormHeaderProps {
  title: string;
  description: string;
}

export default function BranchFormHeader({ title, description }: BranchFormHeaderProps) {
  return (
    <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4">
      <DialogTitle className="flex items-center gap-2">
        <Image src={storeIcon} alt="store" width={50} height={50} />
        {title}
      </DialogTitle>
      <DialogDescription>
        {description}
      </DialogDescription>
      <hr className="border-gray-100" />
    </DialogHeader>
  );
}
