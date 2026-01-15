"use client";
import { ChevronDown, Pencil } from "lucide-react";
import Button from "../../Button";
import { useState } from "react";
import BottomSheet from "../../ui/BottomSheet";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { DataUser } from "@/src/types";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import UserValidation from "@/src/validation/user-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import InputsBirthday from "./InputsBirthday";

interface EditProfileProps {
  dataUser: DataUser;
}

export default function EditProfile(props: EditProfileProps) {
  const { dataUser } = props;
  const [openSheet, setOpenSheet] = useState(false);
  const { register, handleSubmit, control } = useForm<
    z.infer<typeof UserValidation.EDITSCHEMA>
  >({
    resolver: zodResolver(UserValidation.EDITSCHEMA),
    defaultValues: {
      birthday: dataUser.userDetail.birthday || new Date(),
      gender: dataUser.userDetail.gender,
      username: dataUser.username,
    },
  });

  const handleSendData = (data: z.infer<typeof UserValidation.EDITSCHEMA>) => {
    console.log(data);
  };

  return (
    <>
      <Button
        onClick={() => setOpenSheet(true)}
        className="flex items-center justify-center py-3 gap-x-2"
      >
        <Pencil size={14} /> <span>Edit Profile</span>
      </Button>
      <BottomSheet
        isOpen={openSheet}
        onClose={() => setOpenSheet(false)}
        className="h-[50dvh]"
      >
        <h2 className="font-medium text-neutral-900 text-center text-xl">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit(handleSendData)} className="space-y-2">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="username" className="text-sm text-neutral-500">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="px-2 py-1 rounded-sm border border-neutral-100 focus:outline-neutral-300 text-neutral-900"
              placeholder="Your username"
              {...register("username")}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="gender" className="text-sm text-neutral-500">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              defaultValue={dataUser.userDetail.gender}
              render={({ field }) => (
                <Listbox value={field.value} onChange={field.onChange}>
                  <div className="relative w-full">
                    <ListboxButton
                      id="gender"
                      className={
                        "border border-neutral-100 w-full px-2 py-1 rounded-sm flex items-center justify-between text-neutral-300"
                      }
                    >
                      <span>{field.value || "Choose a gender"}</span>
                      <ChevronDown />
                    </ListboxButton>
                    <ListboxOptions
                      className={
                        "border border-neutral-100 focus:outline-neutral-300 px-2 py-1 rounded-sm space-y-2 absolute z-50 mt-1 w-full bg-white"
                      }
                    >
                      <ListboxOption
                        value={"MALE"}
                        className={
                          "border-b border-neutral-100 py-2 ps-2 rounded-sm active:bg-neutral-50 transition-colors duration-100"
                        }
                      >
                        Male
                      </ListboxOption>
                      <ListboxOption
                        value={"FEMALE"}
                        className={
                          "border-b border-neutral-100 py-2 ps-2 rounded-sm active:bg-neutral-50 transition-colors duration-100"
                        }
                      >
                        Female
                      </ListboxOption>
                      <ListboxOption
                        value={"UNKNOWN"}
                        className={
                          "border-b border-neutral-100 py-2 ps-2 rounded-sm active:bg-neutral-50 transition-colors duration-100"
                        }
                      >
                        Unknown
                      </ListboxOption>
                    </ListboxOptions>
                  </div>
                </Listbox>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-sm text-neutral-500" htmlFor="birthday">
              Birthday
            </label>
            <div className="grid grid-cols-3 gap-x-2">
              <InputsBirthday />
            </div>
          </div>
          <div className="flex w-full items-center gap-x-3 mt-10">
            <button className="bg-lightblue-50 text-lightblue-600 font-medium p-2 w-full rounded-md">
              Cancel
            </button>
            <Button type="submit" className="w-full! rounded-md!">
              Save
            </Button>
          </div>
        </form>
      </BottomSheet>
    </>
  );
}
