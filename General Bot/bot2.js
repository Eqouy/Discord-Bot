const Discord = require("discord.js");

const TOKEN = "token";
const PREFIX = "$";

function generateHex() {
   return '#' + Math.floor(Math.random() * 16777215).toString(16);

}

var fortunes = [
       "Yes",
       "No",
       "Maybe",
       "KYS"
];

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("Ready");
});

bot.on("guildMemberAdd", function(member) {
   member.guild.channels.find("name", "welcome").sendMessage(member.toString() + "Welcome to Background Gamers!");

   member.addRole(member.guild.roles.find("name", "Verified"));

});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "info":
            message.channel.sendMessage("This is the General Bot, created by Eqouy");
            break;
            case "commands":
                message.channel.sendMessage("!ping, !info, !8ball [question], !noticeme, !removerole [role], !deleterole [role], !embed [message]");
                break;
        case "ping":
            message.channel.sendMessage("pong");
            break;
        case "8ball":
            if (args=[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Cant read the message");
            break;
        case "embed":
            var embed = new Discord.RichEmbed()
                .addField("ASHTON IS GAY", "Steam Account: Werner", true)
                .setColor(0x00FFFF)
                .setFooter("Messages Controlled by: Eqouy")
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);
            break;
        case "noticeme":
            message.channel.sendMessage(message.author.toString() + " What's Up!");
            break;
        case "deleterole":
            message.guild.roles("name", "Peasants").delete();
            break;
          }

});

bot.login(TOKEN);
