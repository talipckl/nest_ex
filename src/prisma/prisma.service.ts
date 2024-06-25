import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources:{
                db:{
                    url:'sqlserver://127.0.0.1:1433;database=crash_course_nest;integratedSecurity=false;trustServerCertificate=true;user=sa;password=1;'
                }
            }
        })
    }
}
