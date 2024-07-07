import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReferForm } from "../ReferForm";

function ReferModal() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-[#1b70e2] text-white font-extralight py-2 text-sm px-10 rounded-md hover:bg-blue-500">
          Refer
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Enter the email address of the user you want to refer
            </DialogTitle>
          </DialogHeader>
          <ReferForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReferModal;
