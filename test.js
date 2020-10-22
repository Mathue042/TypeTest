const Telegraf = require('telegraf')
const telegram = require('telegraf');
const markup = require('telegraf/markup');
const {
    Stage,
    session
} = Telegraf
require('dotenv').config()
const bot = new Telegraf(process.env.bot_token)
const SceneGenerator = require('./scenes')
const curScene = new SceneGenerator('пиздец')
const testScene = curScene.TestScene()

// bot.use(Telegraf.log())

const stage = new Stage([testScene])

bot.use(session())
bot.use(stage.middleware())



var ask = {
    1: {
        ques: 'вопрос1',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans1'
    },2: {
        ques: 'вопрос2',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans2'
    },3: {
        ques: 'вопрос3',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans3'
    },4: {
        ques: 'вопрос4',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans4'
    },5: {
        ques: 'вопрос5',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans5'
    },6: {
        ques: 'вопрос6',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans6'
    },7: {
        ques: 'вопрос7',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans7'
    },8: {
        ques: 'вопрос8',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans8'
    },9: {
        ques: 'вопрос9',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans9'
    },10: {
        ques: 'вопрос10',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans10'
    },11: {
        ques: 'вопрос11',
        weight: 1,
        vars: ['да', 'нет'],
        action_data: 'ans11'
    }
}
var bigCount = 1
var smallCount = 0
var count = 0


function createButton(big, small, opt) {
    smallCount++
    if (opt) {
        bigCount++
        smallCount = 0
    }
    if (small == 0){
            count += ask[big].weight
    }
    return ({
        text: ask[big].vars[small],
        callback_data: ask[big].action_data + small
    })
}

function inlineKeyboard(count1, count2) {
    return {
        reply_markup: {
            inline_keyboard: [
                [createButton(count1, count2),
                    createButton(count1, count2 + 1, 'brah')
                ]
            ]
        }
    }

}


bot.start((ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, `Известный сомнолог Майкл Бреус выделяет четыре основных хронотипа: Дельфин, Лев, Медведь и Волк. С помощью несложного теста вы сможете быстро определить, кто вы, и узнать рекомендации по необходимому лично вам распорядку дня: когда лучше вставать, когда ложиться спать, когда завтракать-обедать-ужинать, когда заниматься спортом, а когда умственным трудом, и т.д. Майкл Бреус уверяет, что если вы будете жить в соответствии со своим хронотипом, у вас будет хорошее самочувствие и прекрасное настроение. \n Хочешь начть тест?`, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: 'да',
                        callback_data: 'answerStr'
                    },
                    {
                        text: 'нет',
                        callback_data: 'answerNStr'
                    }
                ],
            ],
        }
    }, )
})


bot.command('scenes', async (ctx) => {
    await ctx.scene.enter('test')
    // ctx.scene.leave()
})

bot.action('answerNStr', (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Подумай еще раз, может пройдешь тест?', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'да',
                    callback_data: 'answerStr'
                }],
            ],
        }
    })
})

bot.action('answerStr', async (ctx) => {
     bot.telegram.sendMessage(ctx.chat.id, await 'поехали!!!', ctx.scene.enter('test'))
})


bot.launch();