const express = require('express');
const cors = require('cors');

const app = express();

// const flightRoutes = require('./routes/flight.routes');
const homeRoutes = require('./routes/home.routes');
const uploadRoutes=require("./routes/upload.routes");
const verifyRoutes=require("./routes/verify.routes");
const packageRoutes = require('./routes/package.routes');


app.use(cors());
app.use(express.json());

// app.use('/api/flights', flightRoutes);
app.use('/api/home', homeRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/verify",verifyRoutes);
app.use('/api/packages', packageRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});