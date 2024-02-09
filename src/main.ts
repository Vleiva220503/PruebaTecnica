// main.ts
import { NestFactory } from '@nestjs/core';

import { TournamentModule } from './tournament.module';
async function bootstrap() {
  const app = await NestFactory.create(TournamentModule);
  await app.listen(3000); 
}
bootstrap();
