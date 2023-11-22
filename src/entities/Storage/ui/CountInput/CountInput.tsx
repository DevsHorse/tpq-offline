import React from 'react';
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {FormikHandlers} from "formik";

type PropsType = {
  isInvalid: boolean;
  value: number | string;
  onChange: FormikHandlers['handleChange'];
  onBlur?: FormikHandlers['handleBlur'];
  error: string | undefined;
}

const CountInput = (props: PropsType) => {
  const {isInvalid, value, onChange, onBlur, error} = props;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>Count</FormLabel>
      <Input
        id="count"
        name="count"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Count..."
        type="number"
        data-testid="Input.Count"
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default CountInput;