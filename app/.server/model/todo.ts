import { Document, Schema } from "mongoose";

import { db } from "../lib/mongodb";

export interface Todo extends Document {
	_id: Schema.Types.ObjectId;
	title: string;
	content: string;
	createdAt: Date;
}

const TodoSchema = new Schema<Todo>({
	_id: { type: Schema.Types.ObjectId, auto: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, required: true },
});

export const BoardGameCardModel = db.models.Todo || db.model<Todo>("Todo", TodoSchema);
