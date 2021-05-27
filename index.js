const express = require('express')
const app = express()
const port = process.env.PORT || '8080';



const { Telegraf } = require('telegraf');
const chnlid = '1426649250' // your channel id here
const bot = new Telegraf('1703966483:AAFokawmOTB260Eaxd-QLjZQfP5XXu_leSg'); // Bot Token Here

const axios = require('axios');
const fs = require('fs');

bot.command(['start', 'Start'], async ctx => {
	const cm = bot.telegram.getChatMember(chnlid, ctx.from.id).then(res => {
		if(res.status == 'creator' || res.status == 'member' || res.status ==  'administrator'){
			let START_MESSAGE = `<b>Hey ${ctx.from.first_name},
			
I'm a  bin checker bot made by 

Use /help to get some help

MADE WITH ❤ BY </b>`

			bot.telegram.sendMessage(ctx.chat.id,START_MESSAGE, {
    	parse_mode: 'HTML',
    
      reply_markup: {
        inline_keyboard: [
        [
                  { text: 'Go Inline Here', switch_inline_query_current_chat:''},
                  {text:'Go inline',  switch_inline_query: ''}
        ],
        [
            { text: 'Our channel', url: 'https://telegram.dog/ViperBins'}
          ]
        ]
      }
    })
			}else{
	    let NOT_JOINED = `<b>Hey There,
	
You need to join my update channel to use me🙁</b>`
		bot.telegram.sendMessage(ctx.chat.id,NOT_JOINED, {
    	parse_mode: 'HTML',
    
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Join Now', url: 'https://telegram.me/RKBOTS' }
          ]
        ]
      }
    })
}
		})
	})
bot.command(['help', 'Help'], async ctx => {
	const cm = bot.telegram.getChatMember(chnlid, ctx.from.id).then(res => {
		if(res.status == 'creator' || res.status == 'member' || res.status ==  'administrator'){
			let START_MESSAGE = `<b>Hey ${ctx.from.first_name},
			
It's easy to use me😄

Just use /bin {Bin number} to check the bin.

You can also use in inline, Just use @RkBinBot {Bin Number} in any chat😉

Made with ❤️ by @x_bins_op</b>`

			bot.telegram.sendMessage(ctx.chat.id,START_MESSAGE, {
    	parse_mode: 'HTML',
    
      reply_markup: {
        inline_keyboard: [
        [
                  { text: 'Go Inline Here', switch_inline_query_current_chat:''},
                  {text:'Go inline',  switch_inline_query: ''}
        ],
        [
            { text: 'Our channel', url: 'https://telegram.dog/x_bins_op'}
          ]
        ]
      }
    })
			}else{
	    let NOT_JOINED = `<b>Hey There,
	
You need to join my update channel to use me🙁</b>`
		bot.telegram.sendMessage(ctx.chat.id,NOT_JOINED, {
    	parse_mode: 'HTML',
    
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Join Now', url: 'https://telegram.me/RKBOTS' }
          ]
        ]
      }
    })
}
		})
	})

bot.command("bin", async (ctx) => {
	const checking = await ctx.reply('Checking🔍')
  let input = ctx.message.text.split(" "); 
  if (input.length != 2) {  
    bot.telegram.editMessageText(ctx.chat.id,checking.message_id,checking.message_id,"You must give a bin to check")
    return; 
  }
  let bin = input[1]; 
axios.get(`https://binssuapi.vercel.app/api/${bin}`)
      .then(res => {
      	if (res.data.result == true){
      	bot.telegram.editMessageText(ctx.chat.id,checking.message_id,checking.message_id,`<b>VALID BIN✔

BIN:- <code>${res.data.data.bin}</code> 

VENDOR:- <code>${res.data.data.vendor}</code>

TYPE:- <code>${res.data.data.type}</code>

BANK:- <code>${res.data.data.bank}</code>

COUNTRY:- <code>${res.data.data.country}${res.data.data.countryInfo.emoji} | ${res.data.data.countryInfo.code}</code></b>

`, {
    	parse_mode: 'HTML',
    
      reply_markup: {
        inline_keyboard: [
        [
            { text: 'Our channel', url: 'https://telegram.dog/ViperBins'}
          ]
        ]
      }
    })
      }else{
      	bot.telegram.editMessageText(ctx.chat.id,checking.message_id,checking.message_id,`<b>INVALID BIN ❌

API RESPONSE:- <code>${res.data.message}</code> </b>`, {
    	parse_mode: 'HTML',
    
      reply_markup: {
        inline_keyboard: [
        [
            { text: 'Our channel', url: 'https://telegram.dog/ViperBins'}
          ]
        ]
      }
    })
      }
      
      })
      })
      bot.on('inline_query', async ctx => {
  let query = ctx.inlineQuery.query;
const cm = bot.telegram.getChatMember(chnlid, ctx.inlineQuery.from.id).then(res => {
		if(res.status == 'creator' || res.status == 'member' || res.status ==  'administrator'){
			
  axios.get(`https://binssuapi.vercel.app/api/${query}`)
      .then(res => {
if (res.data.result == true){
let results = [
    {
      type: 'article',
      id: '1',
      title: '👉𝘾𝙇𝙄𝘾𝙆 𝙃𝙀𝙍𝙀👈',
      input_message_content: {
        message_text: `✅ 𝙑𝘼𝙇𝙄𝘿 𝘽𝙄𝙉 ✅

☑ 𝗕𝗜𝗡 :- ${res.data.data.bin}

☑ 𝗩𝗘𝗡𝗗𝗢𝗥 :- ${res.data.data.vendor}

☑ 𝗧𝗬𝗣𝗘 :- ${res.data.data.type}

☑ 𝗕𝗔𝗡𝗞 :- ${res.data.data.bank}

☑ 𝗖𝗢𝗨𝗡𝗧𝗥𝗬 :- ${res.data.data.country}${res.data.data.countryInfo.emoji} | ${res.data.data.countryInfo.code}`,
      },
      description: 'Valid Bin',
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Our Channel', url: 'https://telegram.me/ViperBins' }
          ]
        ]
      }
    }
  ]

  ctx.answerInlineQuery(results);
  }else if (res.data.result == false){
  	let results = [
    {
      type: 'article',
      id: '1',
      title: '👉𝘾𝙇𝙄𝘾𝙆 𝙃𝙀𝙍𝙀👈',
      input_message_content: {
        message_text: `𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗕𝗶𝗻❌

𝗔𝗽𝗶 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲:- ${res.data.message}`,
      },
      description: `it's not a valid bin :(`,
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Our Channel', url: 'https://telegram.me/ViperBins' }
          ]
        ]
      }
    }
  ]

  ctx.answerInlineQuery(results);
  }
})
}else if(res.status != 'creator' || res.status != 'member' || res.status !=  'administrator') {
	let results = [
    {
      type: 'article',
      id: '1',
      title: 'Join Our Channel',
      input_message_content: {
        message_text: `it seems you are not a member of my update channel. Please Join @ViperBins and try again 🙂`,
      },
      description: 'Please join our channel 🙂',
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Join Now 🥰', url: 'https://telegram.me/x_bins_op' }
          ]
        ]
      }
    }
  ]

  ctx.answerInlineQuery(results);
	}
})
})


bot.launch();



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

})
