const Telegraf = require('telegraf')

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
module.exports = {inlineKeyboard, createButton}