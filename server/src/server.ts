import { app } from "./app";

const port = process.env.PORT;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server listenning on ${port}`));
