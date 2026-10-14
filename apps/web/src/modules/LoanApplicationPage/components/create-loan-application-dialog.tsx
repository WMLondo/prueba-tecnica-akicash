import { useState } from "react";
import { Button } from "../../../shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../shared/components/ui/dialog";
import { CreateLoanApplicationForm } from "./create-loan-application-form";

export const CreateLoanApplicationDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Nueva solicitud</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva solicitud de crédito</DialogTitle>
          <DialogDescription>
            Completa los datos para registrar una solicitud.
          </DialogDescription>
        </DialogHeader>
        <CreateLoanApplicationForm
          key={open ? "open" : "closed"}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
