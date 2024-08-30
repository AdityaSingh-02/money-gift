import PrismaInstanceSingleton from "@/db";

const prisma = PrismaInstanceSingleton.getPrismaInstance();
export const transactionFromAdmin = async (adminId: string, to: string, amount: number) => {
    return await prisma.$transaction(async (txn) => {
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
                id: to
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
        const rec = await txn.giftSent.create({
            data: {
                userId: adminId,
                sentTo: to,
                amount
            }
        })
        if (!rec) {
            return {
                status: 404,
                body: {
                    message: "Gift not sent"
                }
            }
        }
        return {
            status: 200,
            body: {
                message: "Gift sent"
            }
        }
    });
}