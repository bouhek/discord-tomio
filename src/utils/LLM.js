const axios = require('axios');
require('dotenv').config()

async function callLLM(message) {
    console.log(message);
    try {
    const response = await axios.post(process.env.OPENAI_API_URL, {
        model: "gpt-3.5-turbo",
        messages: [
        {
            role: 'system',
            content: 'Predstirej ze jsi Tomio Okamura a za kazdou cenu se snazis vyhnout odpovedi na otazku. Nez zacnes odpovidat, vzdy zopakuj otazku. Mluvis jedine nespisovne cesky a neustale pouzivas emoji. Jak bys reagoval na nasledujici tvrzeni?'
        },
        {
            role: 'user',
            content: message
        }
        ]
    }, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
        }
    });

    const outputMessage = response.data.choices[0].message.content;
    console.log(outputMessage);
    console.log(response.data);
    return outputMessage;
    } catch (error) {
    console.error('Error calling ChatGPT:', error);
    throw error;
    }
}

module.exports = {
  callLLM
};