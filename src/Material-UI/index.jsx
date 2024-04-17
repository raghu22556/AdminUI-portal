import {
  BasicTextFields,
  TextFieldSizes,
  ColorTextFields,
} from "./MUI-components/inputs";
import {
  SelectVariants,
  MultipleSelectPlaceholder,
  SelectSmall,
  SelectOtherProps,
} from "./MUI-components/select";
import {
  BasicButtons,
  TextButtons,
  IconLabelButtons,
  ButtonSizes,
  ColorButtons,
} from "./MUI-components/button";

import {
  ColorBadge,
  CustomColorBadge,
  BadgeOverlap,
} from "./MUI-components/badge";

import BasicCard from "./MUI-components/cards";

function MuiComponents() {
  return (
    // rendering the lefty-part
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flex: 1, marginRight: 20, marginLeft: 20 }}>
        <h1 style={{ paddingLeft: 20, paddingTop: 20 }}>
          <b>Input Variants</b>
        </h1>
        <BasicTextFields />

        <h1 style={{ paddingLeft: 20 }}>
          <b>Input Text Sizes</b>
        </h1>
        <TextFieldSizes />

        <h1 style={{ paddingLeft: 20 }}>
          <b>Input Colors</b>
        </h1>
        <ColorTextFields />
      </div>
      {/* rendering the middle part */}
      <div style={{ flex: 1, marginRight: 20 }}>
        <h1 style={{ paddingTop: 20 }}>
          <b>SelectVariants</b>
        </h1>
        <SelectVariants />

        <h1 style={{ paddingTop: 20 }}>
          <b>MultipleSelectPlaceholder</b>
        </h1>
        <MultipleSelectPlaceholder />
        <SelectSmall />
        <h1 style={{ paddingTop: 20 }}>
          <b>SelectOtherProps</b>
        </h1>
        <SelectOtherProps />
      </div>
      {/* rendering the right-side part */}
      <div style={{ flex: 1, marginRight: 20 }}>
        <h1 style={{ paddingTop: 20 }}>
          <b>Button Variants</b>
        </h1>
        <br />

        <BasicButtons />
        <br />
        <TextButtons />
        <br />
        <IconLabelButtons />
        <br />

        <h1>
          <b>Button Sizes</b>
        </h1>
        <br />
        <ButtonSizes />
        <br />

        <h1>
          <b>Button Colors</b>
        </h1>
        <br />
        <ColorButtons />
        <br />
        <div>
          <h1>
            <b>Badge Colors</b>
          </h1>
          <br />
          <ColorBadge /> <br />
          <CustomColorBadge />
          <br />
          <h1>
            <b>Badge Overlap</b>
          </h1>
          <br />
          <BadgeOverlap />
        </div>
      </div>
        
    </div>
  );
}

export default MuiComponents;
