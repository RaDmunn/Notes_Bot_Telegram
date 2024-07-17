import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';
import { TelegramService } from './telegram/telegram.service';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/telegram-notes'),
    NotesModule,
    TelegramModule,
  ],
  providers: [TelegramService],
})
export class AppModule {}
