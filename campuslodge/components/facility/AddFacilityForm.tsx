'use client';

import { Facility, Assets } from "@prisma/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

interface AddFacilityFormProps {
  facility: FacilityWithAssets | null;
}

export type FacilityWithAssets = Facility & {
  assets: Assets[];
};

// Example amenities per category
const amenitiesByCategory: Record<string, string[]> = {
  vehicle: ["Parking Lot", "Garage", "Fuel Station"],
  auditorium: ["Projector", "Sound System", "Lighting"],
  classroom: ["Whiteboard", "Chairs", "Air Conditioning"],
};

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  image: z.string().min(1, { message: "Image is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  locationDescription: z.string().min(1, { message: "Location is required" }),
  category: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
});

const AddFacilityForm = ({ facility }: AddFacilityFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      country: "",
      state: "",
      city: "",
      locationDescription: "",
      category: [],
      amenities: [],
    },
  });

  const selectedCategories = form.watch("category");
  const selectedAmenities = form.watch("amenities");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const handleAmenityToggle = (amenity: string, fieldValue: string[] = []) => {
    return fieldValue.includes(amenity)
      ? fieldValue.filter((item) => item !== amenity)
      : [...fieldValue, amenity];
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-lg font-semibold">
            {facility ? "Update your facility!" : "Describe your facility!"}
          </h3>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility title</FormLabel>
                    <FormControl>
                      <Input placeholder="Facility name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide your facility name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Facility description" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of your facility
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Category checkboxes */}
          <div>
            <FormLabel>Select Facility Category</FormLabel>
            <FormDescription>
              Choose one or more categories your facility belongs to
            </FormDescription>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {["vehicle", "auditorium", "classroom"].map((cat) => (
                <FormField
                  key={cat}
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(cat) || false}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), cat]
                              : field.value?.filter((item) => item !== cat);
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel>{cat}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Conditionally render amenities */}
          {(selectedCategories?.length || 0) > 0 && (
            <div>
              <FormLabel>Select Amenities</FormLabel>
              <FormDescription>
                Amenities available under the selected categories
              </FormDescription>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="amenities"
                  render={({ field }) => (
                    <>
                      {(selectedCategories || []).flatMap((cat) =>
                        amenitiesByCategory[cat]?.map((amenity) => (
                          <FormItem className="flex flex-row items-end" key={amenity}>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(amenity) || false}
                                onCheckedChange={(checked) => {
                                  const updated = handleAmenityToggle(amenity, field.value || []);
                                  field.onChange(updated);
                                }}
                              />
                            </FormControl>
                            <FormLabel>{amenity}</FormLabel>
                          </FormItem>
                        ))
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AddFacilityForm;
