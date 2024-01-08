import app from "./app";
import { connectToDatabase } from "./db/connection";


connectToDatabase().then(() => {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log('Server running on port 3000 & Connected to Database');
  });
}).catch(error => {
  console.log(error);
});

