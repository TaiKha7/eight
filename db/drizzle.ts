import { neon } from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http"; 
import * as schema from "./schema"; 

const sql = neon (process.env.DATABASE_URL!); // ! to not get TS error
const db = drizzle(sql,{ schema }); // use the DRizzle query API 

export default db ; 
