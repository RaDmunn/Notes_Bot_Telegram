import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(title: string, text: string): Promise<Note> {
    const newNote = new this.noteModel({ title, text });
    return newNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }

  async update(id: string, title: string, text: string): Promise<Note> {
    return this.noteModel
      .findByIdAndUpdate(id, { title, text }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Note> {
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
