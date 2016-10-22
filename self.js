var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on("message", message => {
  if(message.author !== bot.user) return;

  var prefix = "/"; // always use a prefix it's good practice.
  if(!message.content.startsWith(prefix)) return; // ignore messages that... you know the drill.

  // We covered this already, yay!
  const params = message.content.split(" ").slice(1);

  if(message.content.startsWith(prefix+"prune")) {
    // get number of messages to prune
    let messagecount = parseInt(params[0]);
    // get the channel logs
    message.channel.fetchMessages({limit: 100})
    .then(messages => {
      let msg_array = messages.array();
      // filter the message to only your own
      msg_array = msg_array.filter(m => m.author.id === bot.user.id);
      // limit to the requested number + 1 for the command message
      msg_array.length = messagecount + 1;
      // Has to delete messages individually. Cannot use `deleteMessages()` on selfbots.
      msg_array.map(m => m.delete().catch(console.error));
   });
  }
 //(/ban command)
  if (message.content.toLowerCase().startsWith(prefix+'ban') && message.member.roles.filter(r=>r.hasPermission('BAN_MEMBERS')).size > 0) {
  message.delete();
  message.channel.sendMessage("Succesfully banned " + message.mentions.users.first())
  console.log('[C] ' + message.author.username + ' Banned ' + message.mentions.users.first())
  message.guild.ban(message.mentions.users.first(), "7");

}
if (message.content.toLowerCase().startsWith(prefix+'stats')) {
    message.channel.sendCode('none','MY STATS\n\n' + 'Users: ' + bot.users.size + '\nServers: ' + bot.guilds.size + '\nChannels: ' + bot.channels.size);
    console.log('[C] ' + message.author.username + ' used /stats on')
}
if (message.content.toLowerCase().startsWith(prefix+'help')) {
    message.channel.sendMessage("*My Help*")
    message.channel.sendCode("none","/ping: Checks if bot is online and gives you Ping in MS\n/stats: Shows server stats\n/github: Gives you a link to our github\n/trello: Gives you a link to our trello\n/facepalm: posts a facepalm gif\n/flip: Flips dem tables\n/booty: ( ͡° ͜ʖ ͡°)\n/mindblown: Posts a mindblown gif")
    console.log('[C] ' + message.author.username + ' used /help')
}
if (message.content.toLowerCase().startsWith(prefix + 'github')) {
  message.reply("Check our github: https://github.com/DarkBot-Coding/darkbot")
  console.log('[C] ' + message.author.username + ' used /github on ' + message.guild.name)
}
if (message.content.toLowerCase().startsWith(prefix+'kick') && message.member.roles.filter(r=>r.hasPermission('KICK_MEMBERS')).size > 0) {
message.delete();
message.reply("Succesfully kicked " + message.mentions.users.first())
console.log('[C] ' + message.author.username + ' Kicked ' + message.mentions.users.first())
message.guild.member(message.mentions.users.first()).kick();
}
if (message.content.toLowerCase().startsWith(prefix+'facepalm')) {
message.delete();
message.channel.sendMessage("http://gif-finder.com/wp-content/uploads/2015/02/Steve-Carell-Facepalm.gif")
}
if (message.content.toLowerCase().startsWith(prefix+'flip')) {
message.delete();
message.channel.sendMessage("(╯°□°）╯︵ ┻━┻")
}
if (message.content.toLowerCase().startsWith(prefix+'booty')) {
message.delete();
message.channel.sendMessage("( ͡° ͜ʖ ͡°) Booty Here\nBooty There ( ͡° ͜ʖ ͡°)\nIt's full of bootiesヽ༼ຈل͜ຈ༽ﾉ ")
}
if (message.content.toLowerCase().startsWith(prefix+'mindblown')) {
message.delete();
message.channel.sendMessage("http://www.reactiongifs.com/r/2013/10/tim-and-eric-mind-blown.gif")
}
if (message.content.toLowerCase().startsWith(prefix+'lenny')) {
message.delete();
message.channel.sendMessage("( ͡° ͜ʖ ͡°)")
}
});

bot.on('ready', () => {
  console.log(`Selfbot Rewrite: Ready to spy on ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);
  console.log("=> Ready");
});

bot.login("token");
