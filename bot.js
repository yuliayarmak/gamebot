const { Telegraf } = require('telegraf');
const config = require('./config.json'); //здесь находиться токен

const gameUrl = 'https://chadcancer.github.io/luckycard/';
const gameUrl2 = 'https://chadcancer.github.io/hangman/';
const gameShortName = 'LuckyCards';
const gameShortName2 = 'hangman';

const bot = new Telegraf(config.token)
bot.start((ctx) => ctx.reply('Здравствуйте! \n\nЯ могу предоставить Вам игры для бессмысленной траты времени и, в некоторых случаях, для повышения своей значимости в обществе. \n\nСписок доступных игор скоро обновится. Ожидайте!'))
bot.help((ctx) => ctx.reply('Ничем не могу помочь. Это всё Ваша вина.'))

bot.command('luckyCards',({ replyWithGame }) => replyWithGame(gameShortName));
bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl));

bot.command('hangmen',({ replyWithGame }) => replyWithGame(gameShortName2));
bot.launch()
