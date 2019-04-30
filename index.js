// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}. Please verify your self now!`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "exposed") {
	  return message.reply(`Yes! You have used the secret command! HeathWDMY is always gay. You know why? Cause I am not perfectly made as S/he abadon me during to process. Lol! Not for insulting!`);
  };
  
  if(command === "cmds") {
	  message.reply("Please wait for a second while the data base is loading!");
	  message.reply("**List of commands to all:**");
      message.reply("1) `.help` To seek help!");
      message.reply("2) `.info` To find more information about the bot.");
      message.reply("**List of commands to SHR , Support team & others:**");
      message.reply("1) `.kick` To kick humans & non-humans only!");
      message.reply("2) `.ban` To ban non-humans only!");
      message.reply("3) `.purge` To delete bulk messages.");
      message.reply("List of commands to rank permission.");
      message.reply("1) `.pd` To log a promotion and need to manual promote **in discord & roblox**.");
      message.reply("2) `.pdo` To log a promotion and auto promote **in discord but manual on roblox**.");
      message.reply("`List of secret commands,`");
      message.reply("1) `.reboot` To reboot the bot. **DO NOT ABUSED IT**");
	  message.reply("2) `.exposed` Fun facts!");
	  message.reply("**Brought to you by YeowEn!**");
	  message.reply("Invite me at : https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8");
  };
  
  if(command === "reboot") {
	  message.reply(`Bot is rebooting! Please do not use any command within this 10 second! Have a nice day!`);
	  message.reply(`Bot is brought to you by YeowEn!`);
	  message.reply(`Countdown :10`);
	  message.reply(`Countdown :9`);
	  message.reply(`Countdown :8`);
	  message.reply(`Countdown :7`);
	  message.reply(`Countdown :6`);
	  message.reply(`Countdown :5`);
	  message.reply(`Countdown :4`);
	  message.reply(`Countdown :3`);
	  message.reply(`Countdown :2`);
	  message.reply(`Countdown :1`);
	  message.reply(`Countdown :0`);
	  message.reply(`Countdown has been completed! Bot has been reboot!`);
  };
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["SHR","Discord Admin","Ranking perms","Discord Moderator","Founder"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this! Because, your a noob! Go training boi!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions? What do I have?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided by them stupid person.";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "help") {
	return message.reply(`Creating a ticket. Please wait up to a min. If not, ping the Support members!`);
	message.reply("How can I help you?");
  }
  
  if(command ==="info") [
	  message.reply(`This bot is made by YeowEn for Aqua Hotel only!`)
  ];
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
  if(!message.member.roles.some(r=>["SHR","Discord Admin","Founder"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this! This is allowed to loyal members such as YeowEn or HeathWDMY.");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions? No right? Go ask HeathWDMY to ban them!");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided by that person!";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(config.token);