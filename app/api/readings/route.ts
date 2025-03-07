import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("sensor_readings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch readings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received data:", body);

    const insertData = {
      temperature: Number(body.temperature),
      humidity: Number(body.humidity),
      pressure: Number(body.pressure),
      voc_index: Number(body.voc_index),
      ph: Number(body.ph),
    };

    // Validation
    if (Object.values(insertData).some((value) => isNaN(value))) {
      console.error("Invalid sensor values:", body);
      return NextResponse.json(
        { error: "Invalid sensor values" },
        { status: 400 }
      );
    }

    console.log("Inserting data:", insertData);

    const { data, error } = await supabase
      .from("sensor_readings")
      .insert([insertData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to save reading" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const { error } = await supabase
      .from("sensor_readings")
      .delete()
      .neq("id", 0); //delete all readings

    if (error) throw error;
    return NextResponse.json({ message: "All readings cleared" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to clear readings" },
      { status: 500 }
    );
  }
}
