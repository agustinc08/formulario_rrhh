import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
type BeforeExitEvent = 'beforeExit';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    // async enableShutdownHooks(app: INestApplication) {
    //     this.$on<BeforeExitEvent>('beforeExit', async () => {
    //         await app.close();
    //     });
    // }
}