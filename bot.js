const { Telegraf } = require('telegraf');
const config = require('./config.json'); //здесь находиться токен
const gameUrl = 'https://chadcancer.github.io/luckycard/';
const gameUrl2 = 'https://chadcancer.github.io/hangman/';

const bot = new Telegraf(config.token)
bot.start((ctx) => ctx.reply('Здравствуйте! \n\nЯ могу предоставить Вам игры для бессмысленной траты времени и, в некоторых случаях, для повышения своей значимости в обществе. \n\nСписок доступных игор скоро обновится. Также, стоит уточнить, что игры будут доступны только для устройств системы IOS, для таких едениц как Iphone. В скорем времени мы это также исправим и игры будут доступны любому пользователю. Ожидайте!'))
bot.help((ctx) => ctx.reply('Ничем не могу помочь. Это всё Ваша вина.'))
bot.launch()
