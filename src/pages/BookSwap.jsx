import { useEffect, useState } from "react";
import Form from "../components/forms/Form";
import Map from "./../components/common/map/Map";
import { createdAt } from "../utils/util";
import { useGeolocation } from "../hooks/useGeolocation";
const fields = [
  {
    label: "Book Title",
    type: "text",
    name: "title",
  },
  {
    label: "Book Author",
    type: "text",
    name: "author",
  },
  {
    label: "Book Category",
    type: "text",
    name: "category",
  },
  {
    label: "Book Copy",
    type: "text",
    name: "copy",
  },
  {
    label: "Phone Number",
    type: "text",
    name: "phone",
  },
];
export default function BookSwap() {
  const [data, setData] = useState({ createdAt: "", userId: "", position: {} });
  const { position, handleClick } = useGeolocation();
  const handleSubmit = (formData) => {
    const time = createdAt();
    setData({
      createdAt: time,
      userId: 1,
      position: position,
    });
    const combinedData = { ...data, ...formData };
    console.log(combinedData);
  };
  useEffect(() => {
    handleClick();
    console.log(position);
  }, []);
  return (
    <div className="py-5 container-fluid">
      <div className="d-lg-flex d-block justify-content-between align-items-center">
        <div className="w-auto mx-auto form-container d-block d-lg-flex justify-content-center align-items-center rounded-4">
          <Form fields={fields} onSubmit={handleSubmit} />
        </div>
        <div className="w-50 ">
          <Map />
        </div>
      </div>
    </div>
  );
}
