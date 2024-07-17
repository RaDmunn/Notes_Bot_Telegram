import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { NotesService } from '../notes/notes.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;

  constructor(private readonly notesService: NotesService) {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  }

  onModuleInit() {
    this.bot.start((ctx) => {
      ctx.reply('Welcome to Notes Bot! Use /add_note to add a note.');
    });

    this.bot.on('text', async (ctx) => {
      const message = ctx.message.text;

      if (message.startsWith('/add_note')) {
        await this.handleAddNoteCommand(ctx, message);
      } else if (message === '/view_notes') {
        await this.handleViewNotesCommand(ctx);
      } else if (message.startsWith('/delete_note ')) {
        await this.handleDeleteNoteCommand(ctx, message);
      } else if (message.startsWith('/edit_note ')) {
        await this.handleEditNoteCommand(ctx, message);
      } else if (message === '/help') {
        await this.handleHelpCommand(ctx);
      } else {
        ctx.reply(
          'Received your message. Use /help to see available commands.',
        );
      }
    });

    this.bot.launch();
  }

  private handleHelpCommand(ctx) {
    const helpMessage = `
Available commands:
/start - Start interacting with the bot
/add_note <title> <text> - Add a new note
/view_notes - View all notes
/delete_note <id> - Delete a note by ID
/edit_note <id> <title> <text> - Edit a note by ID
/help - Show this help message
    `;
    ctx.reply(helpMessage);
  }
  private async handleAddNoteCommand(ctx, message) {
    const [command, title, ...textArr] = message.split(' ');
    const text = textArr.join(' ');
    if (!title || !text) {
      return ctx.reply('Usage: /add_note <title> <text>');
    }
    const note = await this.notesService.create(title, text);
    ctx.reply(`Note added with ID: ${note._id}`);
  }

  private async handleViewNotesCommand(ctx) {
    const notes = await this.notesService.findAll();
    if (notes.length === 0) {
      return ctx.reply('No notes found.');
    }
    const notesString = notes
      .map(
        (note) => `ID: ${note._id}\nTitle: ${note.title}\nText: ${note.text}`,
      )
      .join('\n\n');
    ctx.reply(notesString);
  }

  private async handleDeleteNoteCommand(ctx, message) {
    const [command, id] = message.split(' ');
    if (!id) {
      return ctx.reply('Usage: /delete_note <id>');
    }
    await this.notesService.remove(id);
    ctx.reply(`Note with ID: ${id} deleted.`);
  }

  private async handleEditNoteCommand(ctx, message) {
    const [command, id, title, ...textArr] = message.split(' ');
    const text = textArr.join(' ');
    if (!id || !title || !text) {
      return ctx.reply('Usage: /edit_note <id> <title> <text>');
    }
    await this.notesService.update(id, title, text);
    ctx.reply(`Note with ID: ${id} updated.`);
  }
}
