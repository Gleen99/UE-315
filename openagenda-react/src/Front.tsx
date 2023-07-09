import React, { useState } from "react";
import { IEvent } from "./back/components/types/Types";
import {
  StyledEngineProvider,
  ThemeProvider,
  GlobalStyles,
} from "@mui/material";
import { defaultTheme } from "./front/components/TemplatesFlters/theme";
import { Events } from "./front/components/Filters/Events";
import { EventHome } from "./front/components/TemplatesFlters/TemplateEventWidget/EventHome";

const Front: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  return (
    <div className="my-plugin">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles
            styles={{
              html: {
                fontSize: 14,
              },

              "body .is-layout-constrained > :not(.alignleft):not(.alignright):not(.alignfull)":
                {
                  maxWidth: "initial",
                  marginLeft: "initial",
                  marginRight: "initial",
                },
            }}
          />
          <EventHome />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Front;
