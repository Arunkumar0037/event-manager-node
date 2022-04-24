const { express, env, cors, mongoose } = require('./shared/sharedModules')

env.config();
let app = express() 
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
const routesIndex = require('./routes/index');
routesIndex(app);  

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});


//Connect Mongo DB
const mongo = mongoose.connect(process.env.MONGO_CLUSTER_URI);
mongo.then(async () =>{
    console.log('mongo connected success')
}, error =>{
    console.log(error, 'error');
})