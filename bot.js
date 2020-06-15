const { Telegraf } = require('telegraf');
const config = require('token'); //здесь находится токен

const obj = {
    'LuckyCards' : 'https://chadcancer.github.io/luckycard/',
    'hangman' : 'https://chadcancer.github.io/hangman/',
    'TicTacToe' : 'https://chadcancer.github.io/tictactoe/',
    'twentyfourtyeight' : 'https://chadcancer.github.io/2048/',
    'WaterRiders' : 'https://chadcancer.github.io/water-riders/',
}

const bot = new Telegraf(token)
bot.start((ctx) => ctx.reply('Здравствуйте! \n\nЯ могу предоставить Вам игры для бессмысленной траты времени и, в некоторых случаях, для повышения своей значимости в обществе. \n\nСписок доступных игор скоро обновится. Также, стоит уточнить, что игры будут доступны только для устройств системы IOS, для таких едениц как Iphone. В скорем времени мы это также исправим и игры будут доступны любому пользователю. Ожидайте!'))
bot.help((ctx) => ctx.reply('Ничем не могу помочь. Это всё Ваша вина.'))


bot.on('message', (ctx) => {
    if(ctx.message.text === '/luckyCards'){
        ctx.replyWithGame('LuckyCards')
        bot.gameQuery(({ answerGameQuery }) => answerGameQuery(obj['LuckyCards']));
    } 
    if (ctx.message.text === '/hangmen') {
        ctx.replyWithGame('hangman')
        bot.gameQuery(({ answerGameQuery }) => answerGameQuery(obj['hangman']));     
    }
    if (ctx.message.text === '/TicTacToe') {
        ctx.replyWithGame('TicTacToe')
        bot.gameQuery(({ answerGameQuery }) => answerGameQuery(obj['TicTacToe']));     
    }
    if (ctx.message.text === '/twentyfourtyeight') {
        ctx.replyWithGame('twentyfourtyeight')
        bot.gameQuery(({ answerGameQuery }) => answerGameQuery(obj['twentyfourtyeight']));     
    }
    if (ctx.message.text === '/WaterRiders') {
        ctx.replyWithGame('WaterRiders')
        bot.gameQuery(({ answerGameQuery }) => answerGameQuery(obj['WaterRiders']));     
    }
})   


bot.launch()
