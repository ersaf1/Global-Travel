import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const createBookingSchema = z.object({
  destinationId: z.string().min(1),
  originCityId: z.string().optional(),
  destCityId: z.string().optional(),
  transportMode: z.enum(["FLIGHT", "TRAIN", "CAR", "MOTORCYCLE"]),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  travelers: z.number().min(1).max(20).default(1),
  totalPrice: z.number().optional(),
  currency: z.string().default("USD"),
  notes: z.string().optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      include: {
        destination: { include: { country: true, city: true } },
        originCity: true,
        destCity: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: bookings });
  } catch (error) {
    console.error("[GET /api/bookings]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createBookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        ...parsed.data,
        departureDate: new Date(parsed.data.departureDate),
        returnDate: parsed.data.returnDate ? new Date(parsed.data.returnDate) : undefined,
      },
      include: {
        destination: { include: { country: true, city: true } },
      },
    });

    return NextResponse.json({ data: booking }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/bookings]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
