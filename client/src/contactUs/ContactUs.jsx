"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Button } from "@/ui/button";
import { AppIcon } from "@/lib/icon";
// import { SERVICES } from "@/features/services/pages/section/data";
import axios from "axios";
import { API_BASE_URL } from "@/utils/api";

// Input with icon component
const InputWithIcon = ({ icon, inputProps, ...props }) => {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        <AppIcon icon={icon} size={16} />
      </div>
      <Input className="pl-10" {...inputProps} {...props} />
    </div>
  );
};

export function ContactUs() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const [selectedService, setSelectedService] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, data);
      setServerMessage(response.data.message);
      reset(); // Clear form
      setSelectedService("");
    } catch (error) {
      console.error("Server error:", error);
      setServerMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6 p-6 bg-card border border-border rounded-md">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <InputWithIcon
            id="name"
            type="text"
            placeholder="Enter your Name"
            icon="mdi:account"
            inputProps={register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <InputWithIcon
            id="email"
            type="email"
            placeholder="Enter your Email"
            icon="mdi:email"
            inputProps={register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <InputWithIcon
            id="phone"
            type="tel"
            placeholder="Enter your Phone"
            icon="mdi:phone"
            inputProps={register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <InputWithIcon
            id="subject"
            type="text"
            placeholder="Enter your Subject"
            icon="mdi:message-text"
            inputProps={register("subject", {
              required: "Subject is required",
            })}
          />
          {errors.subject && (
            <p className="text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>

        {/* Services */}
        <div className="space-y-2">
          <Label htmlFor="service">Services</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
              <AppIcon icon="mdi:briefcase" size={16} />
            </div>
            <Select
              onValueChange={(value) => {
                setValue("service", value, { shouldValidate: true });
                setSelectedService(value);
              }}
            >
              <SelectTrigger className="w-full pl-10">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Services</SelectLabel>

                  <SelectItem value="Web development">
                    Web development
                  </SelectItem>
                  <SelectItem value="Mobile App development">
                    Mobile App development
                  </SelectItem>
                  <SelectItem value="SEO">SEO</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {errors.service && (
            <p className="text-sm text-red-500">Please select a service</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500 pointer-events-none">
              <AppIcon icon="mdi:message" size={16} />
            </div>
            <Textarea
              className="pl-10"
              placeholder="Type your message here."
              {...register("message", { required: "Message is required" })}
            />
          </div>
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        <div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
          {serverMessage && (
            <p className="mt-2 text-sm text-center text-muted-foreground">
              {serverMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
