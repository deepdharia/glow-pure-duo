import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

async function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readOrders() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeOrders(orders: any[]) {
  await ensureDataDir();
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function generateOrderId() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `GPD-${stamp}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      quantity,
      notes,
      paymentMethod,
      amount,
      product,
    } = body;

    if (!fullName || !phone || !address || !city || !pincode || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderId = generateOrderId();
    const order = {
      orderId,
      fullName,
      phone,
      email: email || "",
      address,
      city,
      state: state || "",
      pincode,
      quantity,
      notes: notes || "",
      paymentMethod: paymentMethod || "COD",
      amount,
      product,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
      shipping: "Free",
    };

    const orders = await readOrders();
    orders.unshift(order);
    await writeOrders(orders);

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await readOrders();
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] });
  }
}
