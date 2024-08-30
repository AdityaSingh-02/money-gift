
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


export function MakePaymentDialog({ setAmount, email, mobile, name, onClick }: { setAmount: any, email: string, mobile: string, name: string, onClick: () => void }) {

    // const findUser = async (e: any) => {
    //     if (data.email === "") return;
    //     axios.post("/api/event/getuser", { email: data.email })
    //         .then(res => {
    //             if (res.data.status === 200) {
    //                 setGuestData((prev: any) => ({ ...prev, name: res.data.body.data.name, email: res.data.body.data.email, mobile: res.data.body.data.mobile }))
    //             }
    //         })
    // }

    return (
        <div className="text-black">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="font-bold" variant="default">+Add Gift</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Gift</DialogTitle>
                        <DialogDescription>
                            Add a gift to this event
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full">
                        <span className="flex flex-col"><p className="py-[10px] font-semibold">Email</p><Input value={email} placeholder="Email" onChange={(e) => { }} /></span>
                        <span className="flex flex-col"><p className="py-[10px] font-semibold">Amount</p><Input type="number" placeholder="Amount" onChange={(e) => { setAmount(e.target.value) }} /></span>
                        <span className="flex flex-col"><p className="py-[10px] font-semibold">Mobile Number</p><Input value={mobile} placeholder="Mobile Number" onChange={(e) => { }} /></span>
                        <span className="flex flex-col"><p className="py-[10px] font-semibold">Name</p><Input value={name} placeholder="Name" onChange={(e) => { }} /></span>
                        <span className="w-full flex justify-end mt-[20px]">
                            <DialogClose asChild>
                                <Button type="button" onClick={onClick} className="w-full font-bold" variant="default">
                                    Make Payment
                                </Button>
                            </DialogClose>
                        </span>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
