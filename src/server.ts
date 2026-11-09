import app from "./app.js";

const bootstrap = () => {
  try {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server is running on http://localhost:${process.env.PORT || 3000}`,
      );
    });
  } catch (error) {
    console.error("Error during bootstrap:", error);
  }
};

bootstrap();
