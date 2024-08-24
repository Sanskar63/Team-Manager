import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    role: z.string().min(1, "Role is required"),
    status: z.enum(["Active", "Not Active"], { message: "Please provide member status" }),
    teams: z.array(
        z.object({
            name: z.enum(["Product", "Marketing", "Finance", "Design"], { message: "Team name can't be empty" }),
        })
    ).min(1, "At least one team is required"),
    image: z.any().optional(),
});

const ReactHookFormWithZod = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "teams",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const image = watch('image');

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setValue("image", null);
        setImagePreview(null);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[45%] rounded-lg p-4 lg:p-8 bg-white">
                <span className="text-2xl font-bold">Edit Profile</span>

                <div className="w-full flex flex-col items-center my-4">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Selected" className="w-32 h-32 rounded-full object-cover mb-2" />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-green-200 flex items-center justify-center mb-2">
                            <p className="text-sm text-gray-500">No Image</p>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <label htmlFor="file-upload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                            Select Photo
                        </label>
                        <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={removeImage}>
                            Remove Photo
                        </button>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="hidden"
                        id="file-upload"
                        onChange={handleImageChange}
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                </div>

                <div>
                    <label>Name:</label>
                    <input {...register("name")} className="border rounded px-2 py-1 w-full" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label>Email:</label>
                    <input {...register("email")} className="border rounded px-2 py-1 w-full" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label>Role:</label>
                    <input {...register("role")} className="border rounded px-2 py-1 w-full" />
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                </div>

                <div>
                    <label>Status:</label>
                    <select {...register("status")} className="border rounded px-2 py-1 w-full">
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                </div>

                <div>
                    <label>Teams:</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center">
                            <Controller
                                control={control}
                                name={`teams.${index}.name`}
                                render={({ field }) => (
                                    <select {...field} className="border rounded px-2 py-1 w-full">
                                        <option value="">Select Team</option>
                                        <option value="Product">Product</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Design">Design</option>
                                    </select>
                                )}
                            />
                            <button
                                type="button"
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => remove(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append({ name: "" })} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                        Add Team
                    </button>
                    {errors.teams && <p className="text-red-500 text-xs mt-1">{errors.teams.message}</p>}
                </div>

                <button type="submit" className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReactHookFormWithZod;
