import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {"message": "product microservice is up and running for the demo v4"};
  }
}
