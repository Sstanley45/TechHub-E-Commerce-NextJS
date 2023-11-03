"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import SelectColors from "@/app/components/SelectColors";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { Categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { Image } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { error } from "console";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  // console.log("images>>>>", images);

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  //submit function r-h-f
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("Product Data", data);

    //First upload images to firebase

    //Then save product to mongoDB

    setLoading(true);
    let uploadedImages: UploadImageType[] = [];
    if (!data.category) {
      setLoading(false);
      return toast.error("Category is missing!");
    }

    if (!data.images || data.images.length === 0) {
      setLoading(false);
      return toast.error("No selected image!");
    }

    //upload image to firebase storage--takes time ;)
    const handleImageUploads = async () => {
      toast("Creating product, please wait...");

      //we have to upload each image at a time coz admin may add multiple images

      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name; //we make the filename unique so that incase some files have same name, they do not conflict in firebase storage
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  //handle successful uploads on complete
                  //For instance get the download on url ....
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the downloading URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setLoading(false);
        console.log("Error handling image uploads!");
        return toast.error("Error handling image uploads");
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };
    console.log("productData", productData);

    //we have uploaded the image to firebase storage cloud now we have to save the product in our database
    await axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product Created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong, saving to database", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  //functions to add/remove the images to state;

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  return (
    <>
      <Heading title="App a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        type="number"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        register={register}
        label="This Product is in Stock"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 max-h[50vh] overflow-y-auto">
          {Categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the available product colors and upload their images
          </div>
          <div className="text-sm">
            You must upload an image for each of the color selected otherwise
            your color selection will be ignored
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <>
                <SelectColors
                  key={index}
                  item={item}
                  addImageToState={addImageToState}
                  removeImageFromState={removeImageFromState}
                  isProductCreated={isProductCreated}
                />
              </>
            );
          })}
        </div>
      </div>
      <Button
        label={loading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
