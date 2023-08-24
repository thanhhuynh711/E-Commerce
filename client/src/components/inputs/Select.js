import React, { memo } from "react";
import clsx from "clsx";

const Select = ({
  lable,
  options = [],
  register,
  errors,
  id,
  validate,
  style,
  fullWidth,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {lable && <label htmlFor={id}>{lable}</label>}
      <select
        className={clsx("form-select", fullWidth && "w-full", style)}
        id={id}
        {...register(id, validate)}
        defaultValue={defaultValue}
      >
        <option value="">---CHOOSE---</option>
        {options?.map((el) => (
          <option value={el.code}>{el.value}</option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(Select);
