import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pageSize") ?? 12);
    const country = searchParams.get("country") ?? undefined;
    const category = searchParams.get("category") ?? undefined;
    const featured = searchParams.get("featured") === "true" ? true : undefined;
    const trending = searchParams.get("trending") === "true" ? true : undefined;
    const search = searchParams.get("search") ?? undefined;

    const where = {
      ...(country && { country: { name: { contains: country, mode: "insensitive" as const } } }),
      ...(category && { category: { name: { contains: category, mode: "insensitive" as const } } }),
      ...(featured !== undefined && { featured }),
      ...(trending !== undefined && { trending }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.destination.findMany({
        where,
        include: { country: true, city: true, category: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { rating: "desc" },
      }),
      prisma.destination.count({ where }),
    ]);

    return NextResponse.json({
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("[GET /api/destinations]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
