import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"; 

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email Required!!"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid Email Format"], // Email validation
    },
    password: {
      type: String,
      required: [true, "Password Required!!"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    about: {
      type: String,
      trim: true,
    },
    profileURL: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif))$/i.test(v);
        },
        message: "Invalid URL format",
      },
    },
    highestWPM: {
      type: Number,
      default: 0,
    },
    totalTestsTaken: {
      type: Number,
      default: 0,
    },
    accuracyAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.models.users || mongoose.model("users", userSchema);
