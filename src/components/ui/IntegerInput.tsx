import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { IoTriangleSharp } from "react-icons/io5";

type NumberInputType = {
  onlyPositiveNumbers?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  defaultValue: string;
};

export default function IntegerInput({
  onlyPositiveNumbers,
  value,
  setValue,
  defaultValue,
}: NumberInputType) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;

    if (/^-?\d*$/.test(v)) {
      setValue(v);
    }
  };

  const handleBlur = () => {
    if (onlyPositiveNumbers) {
      if (value === "") setValue("1");
      else if (value.charAt(0) === "-") setValue((prev) => prev.slice(1));
    } else if (value === "") setValue(defaultValue);
  };

  const handleIncrease = () => {
    setValue((prev) => (parseInt(prev) + 1).toString());
  };

  const handleDecrease = () => {
    setValue((prev) =>
      onlyPositiveNumbers && value === "1"
        ? prev
        : (parseInt(prev) - 1).toString(),
    );
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className="hover:scale-110 cursor-pointer"
        onClick={handleIncrease}
      >
        <IoTriangleSharp className="text-surface-orange" />
      </button>
      <input
        value={value}
        onChange={handleChange}
        type="text"
        className="w-20 bg-surface rounded-xl p-2 text-center font-bold text-2xl focus:outline-3 outline-surface-orange"
        onBlur={handleBlur}
      />
      <button
        className="hover:scale-110 cursor-pointer"
        onClick={handleDecrease}
      >
        <IoTriangleSharp className="text-surface-orange rotate-180" />
      </button>
    </div>
  );
}
