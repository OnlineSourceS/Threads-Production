"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { MouseEvent, ReactNode } from "react";
interface Props {
  actionTrigger: string | ReactNode;
  actionTitle: string;
  actionDescription: string;
  cancelActionText: string;
  onClickAction: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  confirmActionText: string;
}
export default function ModalComponent({
  actionTrigger,
  actionTitle,
  actionDescription,
  onClickAction,
  cancelActionText,
  confirmActionText,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{actionTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{actionTitle}</DialogTitle>
          <DialogDescription>{actionDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button onClick={onClickAction}>{confirmActionText}</Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {cancelActionText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
