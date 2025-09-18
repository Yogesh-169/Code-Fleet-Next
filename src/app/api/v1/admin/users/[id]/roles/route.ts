import { NextResponse } from 'next/server';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import { UserModel, USER_ROLES } from '@/models/User';
import { userHasRole } from '@/lib/rbac';

const JWT_SECRET = process.env.JWT_SECRET as string;

const bodySchema = z.object({
  roles: z.array(z.enum(USER_ROLES)).min(1),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = req.headers.get('authorization');
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : undefined;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let payload: any;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  if (!payload?.roles || !userHasRole(payload.roles, 'admin')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { roles } = bodySchema.parse(body);

  await connectToDatabase();

  const updated = await UserModel.findByIdAndUpdate(
    params.id,
    { $set: { roles } },
    { new: true }
  );
  if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ id: updated._id, email: updated.email, roles: updated.roles });
}


