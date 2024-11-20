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

    if (error) {
      console.error("Supabase GET error:", error);
      throw error;
    }

    console.log("Fetched readings:", data?.length);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json(
      { error: "Failed to fetch readings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received POST data:", body);

    if (!body.microbial_activity && body.microbial_activity !== 0) {
      throw new Error("Missing microbial_activity in request body");
    }

    const { data, error } = await supabase
      .from("sensor_readings")
      .insert([{ microbial_activity: body.microbial_activity }])
      .select()
      .single();

    if (error) {
      console.error("Supabase POST error:", error);
      throw error;
    }

    console.log("Saved reading:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in POST route:", error);
    return NextResponse.json(
      { error: "Failed to save reading" },
      { status: 500 }
    );
  }
}
