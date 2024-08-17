import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"; // Import the default swagger-ui styles
import { DJANGO_IP } from "../constant";

require("dotenv").config();
// const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");

// const theme = new SwaggerTheme();
// const darkStyle = theme.getBuffer(SwaggerThemeNameEnum.DARK); // Getting a Style

const SwaggerPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <SwaggerUI url={`http://${DJANGO_IP}:8000/swagger/?format=openapi`} />
    </div>
  );
};

export default SwaggerPage;
