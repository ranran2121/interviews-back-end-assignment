import app from "./index";

const port = process.env.PORT || 3000;

app.listen(4000, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`)
);
