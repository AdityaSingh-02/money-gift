import PrismaInstanceSingleton from "@/db";

const prisma = PrismaInstanceSingleton.getPrismaInstance();
export const transation = async (adminId: string, guestId: string, amount: number) => {
    return await prisma.$transaction(async (txn:any) => {
        const admin = await txn.user.findFirst({
            where: {
                id: adminId
            }
        });
        if (!admin) {
            return {
                status: 404,
                body: {
                    message: "Admin not found"
                }
            }
        }
        const guest = await txn.guests.findFirst({
            where: {
                id: guestId
            }
        });
        if (!guest) {
            return {
                status: 404,
                body: {
                    message: "Guest not found"
                }
            }
        }
        const rec = await txn.giftReceived.create({
            data: {
                userId: adminId,
                receivedFrom: guestId,
                amount
            }
        });
        if (!rec) {
            return {
                status: 404,
                body: {
                    message: "Gift not sent"
                }
            }
        }
    });
}