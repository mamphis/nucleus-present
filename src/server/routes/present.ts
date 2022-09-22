import { NextFunction, Request, Response, Router } from "express";
import { readdir, readFile } from "fs/promises";
import { resolve } from "path";

const router = Router();
