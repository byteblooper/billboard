import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "@/app/models/User";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password } =
      await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists with email
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await UserModel.create({
      firstName,
      lastName,
      email,
      phone: phone || "",
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}
