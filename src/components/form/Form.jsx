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
    const image = watch("image");

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

                {/* Image Upload Section */}
                <div className="w-full flex flex-col gap-6 items-center my-4">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Selected" className="w-32 h-32 rounded-full object-cover mb-2" />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-purple flex items-center justify-center mb-2">
                            <p className="text-sm text-white font-bold">No Image</p>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <label htmlFor="file-upload" className="text-blue-950 border border-blue-950 font-bold gap-2 active:scale-[98%] px-4 py-2 rounded flex items-center">
                            <img src="undo-arrow.png" className="w-5" alt="" />
                            <span>Change Photo</span>
                        </label>
                        <button type="button" className="text-blue-950 border border-blue-950 font-bold gap-2 active:scale-[98%] px-4 py-2 rounded flex items-center" onClick={removeImage}>
                            <img src="delete.png" className="w-5" alt="" />
                            <span>Remove Photo</span>
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

                {/* Name and Email Fields */}
                <div className="flex justify-center mb-4">
                    <div className="flex flex-col w-[50%]">
                        <label>Name</label>
                        <input {...register("name")} placeholder="Name" className="border border-gray-500 border-b-2 border-b-black text-gray-700 rounded px-2 py-1 w-[98%] h-11 " />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col w-[50%] ">
                        <label>Email</label>
                        <input {...register("email")} placeholder="abc@gmail.com" className="border border-gray-500 border-b-2 border-b-black text-gray-700  rounded px-2 py-1 w-[98%] h-11" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                </div>

                {/* Role and Status Fields */}
                <div className="flex justify-center mb-4">
                    <div className="flex flex-col w-[50%]">
                        <label>Role:</label>
                        <input {...register("role")} placeholder="Role" className="border border-gray-500 border-b-2 border-b-black text-gray-700  rounded px-2 py-1 w-[98%] h-11" />
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                    </div>

                    <div className="flex flex-col w-[50%] ">
                        <label>Status:</label>
                        <select {...register("status")} className="border border-gray-500 border-b-2 border-b-black bg-white text-gray-700 rounded px-2 py-1 w-[98%] h-11">
                            <option value="Active">Active</option>
                            <option value="Not Active">Not Active</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                    </div>
                </div>

                {/* Selected Teams Tags */}
                <div className=" p-2 pr-6 min-h-11 mb-4 flex flex-wrap gap-3 items-center border border-gray-500 border-b-2 border-b-black rounded relative">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center text-purple px-3 py-1 border border-gray-300 rounded-lg">
                            <span>{field.name}</span>
                            <button
                                type="button"
                                className="ml-2 text-purple hover:scale-[110%]"
                                onClick={() => remove(index)}
                            >
                                <img src="close.png" className="w-2" alt="" />
                            </button>
                        </div>
                    ))}

                    {/* Team Selector */}
                    <div className="absolute right-3">
                        {/* <label className="block mb-2">Teams:</label> */}
                        <Controller
                            control={control}
                            name="teamsSelection"
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="border-2 border-purple rounded-full  bg-white w-7 h-7"
                                    onChange={(e) => {
                                        const selectedTeam = e.target.value;
                                        if (selectedTeam) {
                                            append({ name: selectedTeam });
                                        }
                                        field.onChange(""); // Reset the select value
                                    }}
                                >
                                    <option value=""></option>
                                    <option value="Product">Product</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Design">Design</option>
                                </select>
                            )}
                        />
                        {errors.teams && <p className="text-red-500 text-xs mt-1">{errors.teams.message}</p>}
                    </div>

                </div>
                {/* Submit and Cancel Buttons */}
                <div className="w-full flex flex-row-reverse gap-3">
                    <button type="submit" className="text-blue-950 border border-gray-500 font-bold gap-2 active:scale-[98%] px-4 py-2 rounded">
                        SAVE
                    </button>
                    <button className="text-blue-950 border border-gray-500 font-bold gap-2 active:scale-[98%] px-4 py-2 rounded">
                        CANCEL
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReactHookFormWithZod;
