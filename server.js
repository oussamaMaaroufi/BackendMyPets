require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodayParser = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');
const multer = require('multer');
const Grid = require('gridfs-stream');
const fs = require('fs');
const GridFsStorage = require("multer-gridfs-storage");


const crypto = require('crypto')


//Intiailzie app with express
const app = express();

const AbriRoutes = require('./routes/abri');
const AcceuilRoutes = require('./routes/acceuil');
const AccouplementRoutes = require('./routes/accouplement');
const AdoptionRoutes = require('./routes/adoption');
const AnimalRoutes = require('./routes/animal');
const DomacceuilRoutes = require('./routes/domacceuil');
const InteresseRoutes = require('./routes/interesse');
const LostAndFoundRoutes = require('./routes/lostAndFound');
const MatchRoutes = require('./routes/match');
const RendezVousRoutes = require('./routes/rendezVous');
const UrgenceRoutes = require('./routes/urgence');
const UsersRoutes = require('./routes/users');
const VeterinaireRoutes = require('./routes/veterinaire');
const VolontaireRoutes = require('./routes/volontaire');


require("./routes/file.routes")(app);



//Database Connection
mongoose.Promise = global.Promise; // Fix Deprecation issue
mongoose.connect(process.env.DATABASE ,{ useNewUrlParser: true ,useUnifiedTopology: true });

//Port to be used by the server
const _PORT = process.env.PORT;

const mongoURI = process.env.DATABASE;

//Start the server
app.listen(_PORT, () => {
  console.log(`Server started on port ${_PORT}`)
   
  });




  //CROS MW
app.use(cors());

//Body Parser MW

app.use(bodayParser.json());

//Passport MW
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
require('./config/passport')(passport);


//Static public folder
//app.use(express.static(path.join(__dirname, 'public')));

//Index Rotuer
app.get('/', (req, res, next) => {
  res.send('I am alive')
  console.log('I am alive Deployed')
});









app.use('/abri', AbriRoutes);
app.use('/acceuil', AcceuilRoutes);
app.use('/accouplement', AccouplementRoutes);
app.use('/adoption', AdoptionRoutes);
app.use('/animal', AnimalRoutes);
app.use('/domacceuil', DomacceuilRoutes);
app.use('/interesse', InteresseRoutes);
app.use('/lostAndFound', LostAndFoundRoutes);
app.use('/match', MatchRoutes);
app.use('/rendezVous', RendezVousRoutes);
app.use('/urgence', UrgenceRoutes);
app.use('/users', UsersRoutes);
app.use('/veterinaire', VeterinaireRoutes);
app.use('/volontaire', VolontaireRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))


  