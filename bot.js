const { Telegraf } = require('telegraf');
const config = require('./config.json'); //здесь находится токен

const gameUrl = 'https://chadcancer.github.io/luckycard/';
const gameUrl2 = 'https://chadcancer.github.io/hangman/';
const gameUrl3 = 'https://chadcancer.github.io/tictactoe/';
const gameUrl4 = 'https://chadcancer.github.io/2048/';
const gameUrl5 = 'https://chadcancer.github.io/water-riders/';
const gameShortName = 'LuckyCards';
const gameShortName2 = 'hangman';
const gameShortName3 = 'TicTacToe';
const gameShortName4 = 'twentyfourtyeight';
const gameShortName4 = 'WaterRiders'
let url;

const bot = new Telegraf(config.token)
bot.start((ctx) => ctx.reply('Здравствуйте! \n\nЯ могу предоставить Вам игры для бессмысленной траты времени и, в некоторых случаях, для повышения своей значимости в обществе. \n\nСписок доступных игор скоро обновится. Ожидайте!'))
bot.help((ctx) => ctx.reply('Ничем не могу помочь. Это всё Ваша вина.'))

bot.command('luckyCards',({ replyWithGame }) => replyWithGame(gameShortName));
bot.command('hangmen',({ replyWithGame }) => replyWithGame(gameShortName2));
bot.command('twentyfourtyeight',({ replyWithGame }) => replyWithGame(gameShortName4));
bot.command('TicTacToe',({ replyWithGame }) => replyWithGame(gameShortName3));

bot.gameQuery(({ answerGameQuery }) => answerGameQuery(url));

bot.launch()
