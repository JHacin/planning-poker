import React from "react";
import { FormContext } from "../../../Page/AddSession";
import StyledSelect from "../../StyledElement/StyledSelect";
import { SCALE_FIBONACCI } from "../../../../constants";
import scaleTypes from "../../../../scaleTypes";

const ScaleTypeSelect = () => (
  <FormContext.Consumer>
    {({ handleScaleTypeChange }) => (
      <StyledSelect
        onChange={e => handleScaleTypeChange(e.target.value)}
        defaultValue={SCALE_FIBONACCI}
        width="20%"
      >
        {scaleTypes.map(type => (
          <option key={type.machineName} value={type.machineName}>
            {type.title}
          </option>
        ))}
      </StyledSelect>
    )}
  </FormContext.Consumer>
);

export default ScaleTypeSelect;
