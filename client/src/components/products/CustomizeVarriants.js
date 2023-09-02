import InputForm from "components/inputs/InputForm";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Loading } from "components";
import { getBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { sowModal } from "store/app/appSlice";
import { useDispatch } from "react-redux";
import { apiAddVarriant } from "apis";

const CustomizeVarriants = ({
  customizeVarriant,
  setCustomizeVarriant,
  render,
}) => {
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  useEffect(() => {
    reset({
      title: customizeVarriant?.title,
      color: customizeVarriant?.color,
      price: customizeVarriant?.price,
    });
  }, [customizeVarriant]);

  const handleAddVarriant = async (data) => {
    if (data.color === customizeVarriant.color)
      Swal.fire("Oops!", "Color not changed", "info");
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) formData.append("thumb", data.thumb[0]);
      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }
      dispatch(sowModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiAddVarriant(formData, customizeVarriant._id);
      dispatch(sowModal({ isShowModal: false, modalChildren: null }));
      console.log(response);
    }
  };

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/webp"
      ) {
        toast.warning("File not supported!");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className=" p-4 w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Customize varriants of products
        </h1>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setCustomizeVarriant(null)}
        >
          Cancel
        </span>
      </div>
      <form
        onSubmit={handleSubmit(handleAddVarriant)}
        className="p-4 w-full flex flex-col gap-4"
      >
        <div className="flex  items-center gap-4 w-full">
          <InputForm
            label="Original name"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Need fill this field",
            }}
            style="flex-auto"
            placeholder="Title of varriant"
          />
        </div>
        <div className="flex  items-center gap-4 w-full">
          <InputForm
            label="Price varriant"
            register={register}
            errors={errors}
            id="price"
            validate={{
              required: "Need fill this field",
            }}
            fullWidth
            placeholder="Price of new varriant"
            style="flex-auto"
            type="number"
          />
          <InputForm
            label="Color varriant"
            register={register}
            errors={errors}
            id="color"
            validate={{
              required: "Need fill this field",
            }}
            fullWidth
            placeholder="Color of new varriant"
            style="flex-auto"
          />
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <label className="font-semibold" htmlFor="thumb">
            Upload thumb
          </label>
          <input
            type="file"
            id="thumb"
            {...register("thumb", { required: "Nedd fill" })}
          />
          {errors["thumb"] && (
            <small className="text-xs text-red-500">
              {errors["thumb"]?.message}
            </small>
          )}
        </div>
        {preview.thumb && (
          <div className="my-4">
            <img
              src={preview.thumb}
              alt="thumbnail"
              className="w-[200px] object-contain"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 mt-8">
          <label className="font-semibold" htmlFor="products">
            Upload image of product
          </label>
          <input
            type="file"
            id="products"
            multiple
            {...register("images", { required: "Nedd fill" })}
          />
          {errors["images"] && (
            <small className="text-xs text-red-500">
              {errors["images"]?.message}
            </small>
          )}
        </div>
        {preview.images.length > 0 && (
          <div className="my-4 flex w-full gap-3 flex-wrap">
            {preview.images?.map((el, index) => (
              <div key={index} className="w-fit relative">
                <img
                  src={el}
                  alt="product"
                  className="w-[200px] object-contain"
                />
              </div>
            ))}
          </div>
        )}
        <div className="my-6">
          <Button type="submit">Add varriant</Button>
        </div>
      </form>
    </div>
  );
};

export default memo(CustomizeVarriants);
