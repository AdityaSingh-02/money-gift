
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
import { CalenderDatePicker } from "./Calender"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setEventVenue, setEventName } from "@/store/slices/event"


export function CreateEventDialog({ onClick }: Readonly<{ onClick: () => void}>) {
    const dispatch = useAppDispatch();
    return (
        <div className="text-black">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default">Create Event</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create Event</DialogTitle>
                        <DialogDescription>
                            Get Started with creating events
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full">
                        <span className="flex flex-col"><p className="py-[10px] font-semibold">Event Name</p><Input placeholder="Event Name" onChange={(e) => dispatch(setEventName(e.target.value))} /></span>
                        <span className="flex flex-col"><p className="py-[10px] font-semibold">Event Venue</p><Input placeholder="Event Venue" onChange={(e) => dispatch(setEventVenue(e.target.value))} /></span>
                        <span className="flex flex-col"><p className="py-[10px] font-semibold">Date</p><CalenderDatePicker /></span>
                        <span className="w-full flex justify-end mt-[20px]">
                            <DialogClose asChild>
                                <Button onClick={onClick} type="button" className="w-full" variant="default">
                                    Create
                                </Button>
                            </DialogClose>
                        </span>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
