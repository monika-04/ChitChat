//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

const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const configuration = new Configuration({
    organization: "org-iwdzAI7kTwoUlD6aKLb2rsp0",
    apiKey:"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",
});
const openai = new OpenAIApi(configuration);
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


const port = 5000;

app.post('/',async(req,res)=>{
  const {message, currentModel} = req.body;
  console.log("message",message)
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  
  res.json({
    message: response.data.choices[0].text,
  })
});

app.get('/models', async(req,res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data
  })
});

app.listen(port, ()=>{
  console.log(`Example app listening at http://localhost:${port}`)
});

