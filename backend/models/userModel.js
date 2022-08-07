import mongoose from "mongoose";
import bcrypt from "bcryptjs";

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
let validatePassword = function (password) {
  if (password.length < 8) {
    return false;
  }

  return true;
};
let validatePhone = function (phone) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(phone);
};
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 255,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
      validate: [validatePassword, "Please fill a valid Password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasPaidOrders: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasOrders: {
      type: Boolean,
      required: true,
      default: false,
    },
    address: {
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      phoneNumber: {
        type: String,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
