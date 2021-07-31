import { Injectable } from '@nestjs/common';

// Provider: 의존성 주입을 위해 module에 넣어줘야 함.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
