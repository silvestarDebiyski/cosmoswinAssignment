import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const filePath = path.resolve(process.cwd(), '..', 'api', 'user-mock-data.json');
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const index = users.findIndex((u: any) => u.username === data.username);
    users[index] = data;

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
    const updatedUser =  users[index]

    return NextResponse.json({ updatedUser });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error updating file', error: error.message },
      { status: 501 }
    );
  }
}