import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    icon: {
      type: String,  // SVG icon identifier / URL
      default: "stethoscope",
    },
    image: {
      type: String,  // Image URL
    },
    category: {
      type: String,
      enum: ["Consultation", "Diagnostics", "Surgery", "Therapy", "Emergency", "Wellness", "Specialist"],
      required: true,
    },
    features: [
      {
        title: { type: String, required: true },
        description: { type: String },
      },
    ],
    pricing: {
      consultationFee: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
      isFree: { type: Boolean, default: false },
    },
    availability: {
      daysAvailable: {
        type: [String],
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
      startTime: { type: String, default: "09:00" },
      endTime: { type: String, default: "17:00" },
    },
    averageDuration: { type: Number, default: 30 }, // in minutes
    specialistsCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    tags: [String],
    relatedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Auto-generate slug from name
serviceSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }
  next();
});

// Virtual: formatted price
serviceSchema.virtual("formattedPrice").get(function () {
  if (this.pricing.isFree) return "Free";
  return `$${this.pricing.consultationFee}`;
});

// Index for search
serviceSchema.index({ name: "text", shortDescription: "text", tags: "text" });
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ isFeatured: 1, sortOrder: 1 });

const Service = mongoose.model("Service", serviceSchema);
export default Service;
