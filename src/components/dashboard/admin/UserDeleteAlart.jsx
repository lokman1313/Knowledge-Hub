"use client";

import { bookDelete } from "@/lib/apis/books";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function UserDeleteAlart({ userId }) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await bookDelete(userId);
      if (res) {
        toast.warning("The User is delete permanently");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };
  return (
    <AlertDialog>
      <Button
        size="sm"
        className="border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition font-medium"
      >
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete User permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="danger">
                Delete User
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
