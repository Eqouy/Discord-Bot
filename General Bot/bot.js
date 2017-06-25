const Discord = require("discord.js");
const client = new Discord.Client();

function commandIs(str, msg) {
    return msg.content.toLowerCase().startsWith("!" + str);
}

function pluck(array) {
    return array.map(function(item) {
        return item["name"];
    });
}

function hasRole(mem, role) {
    if (pluck(mem.roles).includes(role)) {
        return true;
    } else {
        return false;
    }
}

client.on('ready', () => {
    console.log('Succesfully Logged Into Discord!');
});
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if (commandIs("hello", message)) {
        message.channel.sendMessage('Hello there,' + message.author.username);
    }
    if (commandIs("sysinfo", message)) {
        if (args.length === 1) {
            message.channel.sendMessage('You did not define an argument. Usage: [!sysinfo 1]`');
        } else if (args.length === 2) {
            message.channel.sendMessage('Hello, I am the General Bot!');

        } else {
            message.channel.sendMessage('You defined too many arguments. Usage: [!sysinfo 1]`');
        }
    }
    if (commandIs("say", message)) {
        if (hasRole(message.member, "Admins")) {
            if (args.length === 1) {
                message.channel.sendMessage('You did not define an argument. Usage: `!say (message)]`');
            } else {
                message.channel.sendMessage(args.join(" ").substring(5));
            }
        } else {
            message.channel.sendMessage('You are not an Admin');
        }
    }
    if (commandIs("delete", message)) {
        if (hasRole(message.member, "Admins")) {
            if (args.length >= 3) {
                message.channel.sendMessage('You defined too many argiments. Usage: `!delete (number of messsages to delete)`');
            } else {
                var msg;
                if (args.length === 1) {
                    msg = 2;
                } else {
                    msg = parsetInt(args[1]);
                }
                message.channel.fetchMessages = ({
                    limit: msg
                }).then(messages => message.channel.bulkDelete(messages)).catch(console.error);

            }
        } else {
            message.channel.sendMessage('You are not an Admin');
        }
    }
});

client.login('token');
