import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("sensor_readings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

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
      microbial_activity: Number(body.microbial_activity),
      temperature: Number(body.temperature),
      humidity: Number(body.humidity),
    };

    // Add validation
    if (isNaN(insertData.temperature) || isNaN(insertData.humidity)) {
      console.error("Invalid temperature or humidity values:", body);
      return NextResponse.json(
        { error: "Invalid temperature or humidity values" },
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
