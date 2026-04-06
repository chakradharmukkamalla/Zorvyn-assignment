import bcrypt from 'bcryptjs';
import prisma from '../database/prisma';
import { ROLES, isValidRole } from '../utils/constants';

interface UserFilter {
  page?: number;
  limit?: number;
  search?: string;
}

export const userService = {
  async getAll(filter: UserFilter = {}) {
    const { page = 1, limit = 10, search } = filter;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          active: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  },

  async update(id: string, data: { name?: string; role?: string; active?: boolean }) {
    // Validate role if provided
    if (data.role && !isValidRole(data.role)) {
      throw new Error(`Invalid role. Must be one of: ${ROLES.join(', ')}`);
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.role && { role: data.role }),
        ...(data.active !== undefined && { active: data.active }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  },

  async deactivate(id: string) {
    const user = await prisma.user.update({
      where: { id },
      data: { active: false },
      select: {
        id: true,
        email: true,
        name: true,
        active: true,
      },
    });
    return user;
  },

  async activate(id: string) {
    const user = await prisma.user.update({
      where: { id },
      data: { active: true },
      select: {
        id: true,
        email: true,
        name: true,
        active: true,
      },
    });
    return user;
  },

  async delete(id: string) {
    await prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  },
};
