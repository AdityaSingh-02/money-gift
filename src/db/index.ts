import { PrismaClient } from "@prisma/client";

class PrismaInstanceSingleton {
    private static prismaInstance: PrismaClient;
    private constructor() { }

    public static getPrismaInstance(): PrismaClient {
        if (!this.prismaInstance) {
            this.prismaInstance = new PrismaClient();
        }
        return this.prismaInstance;
    }
}

export default PrismaInstanceSingleton;