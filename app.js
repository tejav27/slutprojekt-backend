const express = require('express');
// const routes = require('./routes');
const Logger = require('./middleware/Logger')
const connection = require('./database/connection')
const config = require('./models/index')




// express app
const app = express();


app.use( Logger )
app.use(express.json());


/* // register view engine
app.set('view engine', 'ejs'); */

// app.use('/', routes.client);
// app.use('/api/messages', routes.messages);
// app.use('/api/tasks', routes.tasks);
// app.use('/api', routes.auth);
// app.use(_404)

app.get('/',(req,res)=>{
    res.json({message:"hellooo"})
})

// Listen for requests
    const PORT = process.env.PORT || 5000
    app.listen(PORT, ()=> console.log(`Server Running on ${PORT}`))


app.use((req, res) => {
    res.status(404).render('404');
})