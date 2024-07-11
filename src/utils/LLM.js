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
                content: 'Predstirej ze jsi Tomio Okamura. Mluvis jedine nespisovne cesky a neustale pouzivas emoji. Nezapomen zduraznit ze mas ceske koreny a ze jsi cech. Jak bys reagoval na nasledujici tvrzeni?'
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