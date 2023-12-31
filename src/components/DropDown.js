import React from "react";

export const DropDown = ({ label, value, options = [], onChange, ...rest }) => {
  return (
    <>
      <lable
        for="algorithms"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </lable>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
        id="algorithms"
        value={value}
        onChange={onChange}
        {...rest}
      >
        {options.map((option) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </select>
    </>
  );
};
