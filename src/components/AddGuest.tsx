
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import axios from "axios";


export function AddGuestDialog({ onClick, setGuestData, data }: { onClick: () => void, setGuestData: any, data: any }) {

    const findUser = async (e: any) => {
        if (data.email === "") return;
        axios.post("/api/event/getuser", { email: data.email })
            .then(res => {
                if (res.data.status === 200) {
                    setGuestData((prev: any) => ({ ...prev, name: res.data.body.data.name, email: res.data.body.data.email, mobile: res.data.body.data.mobile }))
                }
            })
    }

    return (
        <div className="text-black">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="font-bold" variant="default">+ Add Guest</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Guest</DialogTitle>
                        <DialogDescription>
                            Add a guest to this event
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full">
                        <span className="flex flex-col"><p className="py-[10px] font-semibold">Guest Email</p><Input placeholder="Guest Email" onChange={(e) => setGuestData((prev: any) => ({ ...prev, email: e.target.value }))} /></span>
                        <span className="flex flex-col"><p className="py-[10px] font-semibold">Guest Mobile</p><Input placeholder="Guest Mobile" onSelect={findUser} value={data.mobile} onChange={(e) => { setGuestData((prev: any) => ({ ...prev, mobile: e.target.value })) }} /></span>
                        <span className="flex flex-col"><p className="py-[10px] font-semibold">Guest Name</p><Input placeholder="Guest Name" onSelect={findUser} value={data.name} onChange={(e) => { setGuestData((prev: any) => ({ ...prev, name: e.target.value })) }} /></span>
                        <span className="w-full flex justify-end mt-[20px]">
                            <DialogClose asChild>
                                <Button onClick={onClick} type="button" className="w-full font-bold" variant="default">
                                    + Add
                                </Button>
                            </DialogClose>
                        </span>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
