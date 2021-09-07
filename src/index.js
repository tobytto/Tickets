import app from '../app'
import './database'


console.log('Server listen on port', 5555)
app.listen(process.env.PORT || 5555)



//npm run dev 