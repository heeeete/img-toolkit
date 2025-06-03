/* eslint-disable no-var */
import type { Connection } from "mongoose";
import mongoose from "mongoose";

// * MongoDB Database
// TODO: 사용하는 MongoDB 데이터베이스 이름에 따라 Enum과 Connection을 추가
export enum MongoDB {
	DB = "todo",
}

const MONGODB_URI = process.env.MONGODB_URI;

const connectionOptions = {
	bufferCommands: false,
	authSource: "admin",
	replicaSet: "rs0",
};

export const db: Connection = mongoose.createConnection(
	`${MONGODB_URI}/${MongoDB.DB}`,
	connectionOptions
);
