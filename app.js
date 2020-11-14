// Requires
const Discord = require("discord.js");
const fs = require("fs");
const config = require('./config.json');

//JSON Files
let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
let userGrind = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
let userBomb = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

// Events
fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
});

fs.writeFile('Storage/userData.json', JSON.stringify(userGrind), (err) => {
    if (err) console.error(err);
});

fs.writeFile('Storage/userData.json', JSON.stringify(userBomb), (err) => {
    if (err) console.error(err);
});

// Create a new client using the new keyword
const client = new Discord.Client();

const talkedRecently = new Set();

const bitcoinClaim = new Set();

const now = Date.now();

var time = 0;

// Commands
const array = ["mb melly", "mb vibecheck", "mb help", "mb sendmelly", "mb jig", "mb blessed", "mb balance", "mb grind", "mb gamble", "mb math", "mb shop", "mb buy", "mb inventory", "mb use", "mb ope", "mb profile"];
const items = ["bomb", "lebanese chicken", "baby bottle", "banana", "bitcoin mine", "rum and coke", "gamemon"]

// Display a message when the bot comes online
client.on("ready", () => {

    console.log('MellyBot activated'); 

    answered = true;
    mathAnswer = "";
    userAnswer = "";

});

// Check for new messages
client.on("message", msg => 
{
    const toLower = msg.content.toLowerCase();    

    // Money variable
    if (!userData[msg.author.id + msg.guild.id]) userData[msg.author.id + msg.guild.id] = {}
    if (!userData[msg.author.id + msg.guild.id].money) userData[msg.author.id + msg.guild.id].money = 0;

    // Grind variable
    if (!userGrind[msg.author.id + msg.guild.id]) userGrind[msg.author.id + msg.guild.id] = {}
    if (!userGrind[msg.author.id + msg.guild.id].grind) userGrind[msg.author.id + msg.guild.id].grind = 1;

    // Bomb variable
    if (!userBomb[msg.author.id + msg.guild.id]) userBomb[msg.author.id + msg.guild.id] = {}
    if (!userBomb[msg.author.id + msg.guild.id].bomb) userBomb[msg.author.id + msg.guild.id].bomb = 0;
    
    // Bottle variable
    if (!userData[msg.author.id + msg.guild.id].bottle) userData[msg.author.id + msg.guild.id].bottle = 0;

    // Banana variable
    if (!userData[msg.author.id + msg.guild.id].banana) userData[msg.author.id + msg.guild.id].banana = 1;

    // Bitcoin variable
    if (!userData[msg.author.id + msg.guild.id].bitcoin) userData[msg.author.id + msg.guild.id].bitcoin = 0;

    // Rum and Coke variable
    if (!userData[msg.author.id + msg.guild.id].rum) userData[msg.author.id + msg.guild.id].rum = 0;

    // Gameboy variable
    if (!userData[msg.author.id + msg.guild.id].gamemon) userData[msg.author.id + msg.guild.id].gamemon = 0;

    // Keys variable
    if (!userData[msg.author.id + msg.guild.id].keys) userData[msg.author.id + msg.guild.id].keys = 0;

    // Check if the player got the math question right
    if (answered == false && msg.author == quizUser) 
    {
        userAnswer = msg;
        if (userAnswer == mathAnswer)
        {
            userData[msg.author.id + msg.guild.id].money += userData[msg.author.id + msg.guild.id].banana;
            msg.reply("Correct! +" + userData[msg.author.id + msg.guild.id].banana + "MM for being blessed at math.");
        }
        else
        {
            msg.reply("Wrong, you monkey! It's " + mathAnswer + ".");
        }
        answered = true; mathAnswer = ""; userAnswer = "";
    }
    // Do command if the message starts with the 'mb' prefix
    if(toLower.startsWith('mb '))
    {  
        // Send message 'Mellyyyyyy', but mostly used to test stuff
        if (toLower === array[0]) 
        {
            msg.reply("Mellyyyyy");
        }
        // Vibe check command
        else if (toLower === array[1]) 
        {
            if (Math.random() >= 0.5) 
            {
                msg.reply("you failed the vibe check :( \n -1 MM");
                userData[msg.author.id + msg.guild.id].money -= 1;
            }
            else 
            {
                msg.reply("you passed the vibe check :) \n +1 MM");
                userData[msg.author.id + msg.guild.id].money += 1;
            }
        }
        // Help command
        else if (toLower === array[2])
        {
            msg.channel.send({embed:{
                title:"Commands",
                fields:[{
                    name:"List",
                    value: array.join("\n").toString(),
                    inline: true
                },
                ]
            }
            })
        }
        // Send melly command
        else if (toLower === array[3])
        {
            number = 210;
            var random = Math.floor(Math.random() * (number - 1 + 1)) + 1; 
            msg.channel.send ({ files: ["./mb" + random + ".png"] });  
        }
        // Send jig command
        else if (toLower === array[4])
        {
            jig = "./jig.gif";
            msg.channel.send ({ files: [jig] });
        }
        // Blessed checker command
        else if (toLower === array[5])
        {
            blessed = (Math.floor(Math.random() * 100)) + 1

            if (blessed <= 25)
            {
                msg.reply("you are " + blessed + "% blessed. You're rude!");
            }
            else if (blessed > 25 && blessed <= 50)
            {
                msg.reply("you are " + blessed + "% blessed. You're kinda blessed.");
            }
            else if (blessed > 50 && blessed <= 75)
            {
                msg.reply("you are " + blessed + "% blessed. You're pretty blessed ngl.");
            }
            else if (blessed > 75 && blessed < 100)
            {
                msg.reply("you are " + blessed + "% blessed. Damn you're hella blessed!");
            }
            else
            {
                msg.reply("you are " + blessed + "% blessed. Couldn't be more blessed! \nHere's 10 MM for being too blessed :D");
                userData[msg.author.id + msg.guild.id].money += 10;
            }
        }
        // Balance command
        else if (toLower === array[6])
        {
            msg.channel.send({embed:{
                title:"Balance",
                fields:[{
                    name:"Name",
                    value: msg.author.username,
                    inline: true
                },
                {
                    name:"Amount",
                    value: userData[msg.author.id + msg.guild.id].money + " MM :money_mouth:"
                }]
            }

            })
        }
        // Grind command
        else if (toLower === array[7])
        {
            if (talkedRecently.has(msg.author.id)) {
                msg.reply((15 - userData[msg.author.id + msg.guild.id].rum) + " second cooldown, you monkey!");
            } 
            else 
            {
                if (Math.random() < 0.9)
                {
                    userData[msg.author.id + msg.guild.id].money += userGrind[msg.author.id + msg.guild.id].grind;
                    msg.reply("you grinded for the bread. +" + userGrind[msg.author.id + msg.guild.id].grind + " MM");
                }
                else
                {
                    userData[msg.author.id + msg.guild.id].money += userGrind[msg.author.id + msg.guild.id].grind * 2;
                    msg.reply("you grinded extra hard for that bread. +" + userGrind[msg.author.id + msg.guild.id].grind * 2 + " MM");
                }
    
               // the user can type the command ... your command code goes here :)
    
            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(msg.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              talkedRecently.delete(msg.author.id);
            }, (15000 - (userData[msg.author.id + msg.guild.id].rum) * 1000));

        }
            
        }
        // Gamble command
        else if (toLower === array[8])
        {
            if (userData[msg.author.id + msg.guild.id].money > 0)
            {
                if (Math.random() <= 0.5) 
                {
                    userData[msg.author.id + msg.guild.id].money = 0;
                    msg.reply("Get rekt, you lost all your Melly Money");
                }
                else
                {
                    userData[msg.author.id + msg.guild.id].money *= 2;
                    msg.reply("Bless! You won and doubled your Melly Money! You now have " + userData[msg.author.id + msg.guild.id].money + " MM");
                }
            } else {
                msg.reply("What do you have to gamble, you monkey?");
            }
        }
        // Math question command
        else if (toLower === array[9])
        {
            num1 = Math.floor(Math.random() * 13 - userData[msg.author.id + msg.guild.id].bottle);
            num2 = Math.floor(Math.random() * 13 - userData[msg.author.id + msg.guild.id].bottle);
            num3 = Math.floor(Math.random() * 21 - (userData[msg.author.id + msg.guild.id].bottle * 2));

            if (num1 < 0)
            {
                num1 = 0;
            }
            if (num2 < 0)
            {
                num2 = 0;
            }
            if (num3 < 0)
            {
                num3 = 0;
            }

            mathAnswer = num1 * num2 + num3;

            msg.reply("What is " + num1 + " * " + num2 + " + " + num3  + " ?")

            answered = false;
            quizUser = msg.author;

        }
        // Shop command
        else if (toLower.startsWith(array[10]))
        {
            if (toLower.includes("1"))
            {
                msg.channel.send({embed:{
                    title:"Shop",
                    fields:[{
                        name:"Bomb :bomb:",
                        value: "10 MM\n //boxes 5 random people, might even be you",
                        inline: false
                    },
                    {
                        name:"Lebanese Chicken :poultry_leg:",
                        value: "25 MM\n //spend Arab, grind Arab, or may make you sick....\n +1 MM/*mb grind*",
                        inline: false
                    },
                    {
                        name:"Baby Bottle :baby_bottle:",
                        value: "40 MM\n //makes *mb math* easier, just cuz you're a baby",
                        inline: false
                    },
                    {
                        name:"Banana :banana:",
                        value: "50 MM\n //become a smarter monkey \n +1 MM/correct *mb math* answer",
                        inline: false
                    },
                    {
                        name:"Bitcoin Mine :computer:",
                        value: "100 MM\n //mines a bitcoin every hour. Do *mb use* to claim it\n +15-50 MM/hour",
                        inline: false
                    }]
                }
                })
            }
            else if (toLower.includes("2"))
            {
                msg.channel.send({embed:{
                    title:"Shop",
                    fields:[{
                        name:"Rum and Coke :tumbler_glass:",
                        value: "200 MM\n //A drink to your grind! \n -1 sec cooldown on *mb grind*",
                        inline: false
                    },
                    {
                        name:"GameMon :video_game:",
                        value: "500 MM\n //Play a selection of games to earn keys \nDo *mb use gamemon* to use",
                        inline: false
                    }],
                }
                })
            }
            else
            {
                msg.reply("Do *mb shop [number]*")
            }
        }
        // Buying command
        else if (toLower.startsWith(array[11]))
        {
            // Bomb
            if (toLower.includes(items[0]))
            {
                if (userData[msg.author.id + msg.guild.id].money >= 1)
                {
                    msg.reply("Bomb successfully purchased!");
                    userData[msg.author.id + msg.guild.id].money -= 1;
                    userBomb[msg.author.id + msg.guild.id].bomb += 1;

                } else {
                    msg.reply("You're too broke, my guy");
                }
            }
            // Lebanese chicken
            else if (toLower.includes(items[1]))
            {
                if (userData[msg.author.id + msg.guild.id].money >= 25)
                {
                    msg.reply("Lebanese chicken successfully purchased!");
                    userData[msg.author.id + msg.guild.id].money -= 25;

                    if (Math.random() > 0.1)
                    {
                        msg.reply("Bless! You didn't get sick. +1 MM/grind")
                        userGrind[msg.author.id + msg.guild.id].grind += 1;
                    } else {
                        msg.reply("The lebanese chicken made you sick.\n-10 MM to pay for the medical bill.")
                        userData[msg.author.id + msg.guild.id].money -= 10;
                    }
                } else {
                    msg.reply("You're too broke, my guy");
                }

            // Send this if item doesn't exist
            } 
            else if (toLower.includes(items[2]))
            {
                if (userData[msg.author.id + msg.guild.id].bottle >= 4)
                {
                    msg.reply("You're maxed out on baby bottles, you baby :baby:")
                }
                else
                {
                    if (userData[msg.author.id + msg.guild.id].money >= 40)
                    {
                        msg.reply("Baby bottle successfully purchased!")
                        userData[msg.author.id + msg.guild.id].money -= 40;
                        userData[msg.author.id + msg.guild.id].bottle += 1;
                    }
                    else
                    {
                        msg.reply("You're too broke, my guy");
                    } 
                }
            }
            else if (toLower.includes(items[3]))
            {
                if (userData[msg.author.id + msg.guild.id].money >= 50)
                {
                    msg.reply("Banana successfully purchased!")
                    userData[msg.author.id + msg.guild.id].banana += 1;
                    userData[msg.author.id + msg.guild.id].money -= 50;
                }
                else
                {
                    msg.reply("You're too broke, my guy");
                }
            }
            else if (toLower.includes(items[4]))
            {
                if (userData[msg.author.id + msg.guild.id].money >= 100)
                {
                    msg.reply("Bitcoin mine successfully purchased!")
                    userData[msg.author.id + msg.guild.id].money -= 100;
                    userData[msg.author.id + msg.guild.id].bitcoin += 1;
                }
                else
                {
                    msg.reply("You're too broke, my guy");
                }
            }
            else if (toLower.includes(items[5]))
            {
                if (userData[msg.author.id + msg.guild.id].rum >= 5)
                {
                    msg.reply("You're maxed out on rum and coke, you alcoholic")
                }
                else
                {
                    if (userData[msg.author.id + msg.guild.id].money >= 200)
                    {
                        msg.reply("Rum and coke successfully purchased!")
                        userData[msg.author.id + msg.guild.id].money -= 200;
                        userData[msg.author.id + msg.guild.id].rum += 1;
                    }
                    else
                    {
                        msg.reply("You're too broke, my guy")
                    }
                }
            }
            else if (toLower.includes(items[6]))
            {
                if (userData[msg.author.id + msg.guild.id].gamemon >= 1)
                {
                    msg.reply("You already have a GameMon, you fish")
                }
                else
                {
                    if (userData[msg.author.id + msg.guild.id].money >= 0)
                    {
                        msg.reply("GameMon successfully purchased!")
                        userData[msg.author.id + msg.guild.id].money -= 0;
                        userData[msg.author.id + msg.guild.id].gamemon += 1;
                    }
                    else
                    {
                        msg.reply("You're too broke, my guy")
                    }
                }
            }
            else
            {
                msg.reply("That's not an existing item, you monkey.");
            }
        }
        else if (toLower === array[12])
        {
            msg.channel.send({embed:{
                title: msg.author.username + "'s Inventory",
                fields:[{
                    name:"Bombs :bomb:",
                    value: userBomb[msg.author.id + msg.guild.id].bomb,
                    inline: false
                },
                {
                    name:"Keys :key:",
                    value: userData[msg.author.id + msg.guild.id].keys,
                    inline: false
                }],
            }

            })
        }
        // Send this if a user sends a non-existing command
        else if (toLower.startsWith(array[13]))
        {
            if (toLower.includes(items[0]))
            {
                if (userBomb[msg.author.id + msg.guild.id].bomb >= 1)
                {
                    msg.channel.send(msg.author.username + " used a bomb.");
                    msg.channel.send("It was a dud. Get rekt.");
                }
                else
                {
                    msg.reply("You bruk up mon, you don't have any bombs.");
                }
            }
            else if (toLower.includes(items[4]))
            {
                if (userData[msg.author.id + msg.guild.id].bitcoin > 0)
                {   
                    if (bitcoinClaim.has(msg.author.id)) {
                        msg.channel.send({embed: {
                            title: "Bitcoin Claim :pick:",
                            description: "Bitcoin mining in process...\nTry again in one hour"
                            }})
                    } else {
                        bitcoinAmount = userData[msg.author.id + msg.guild.id].bitcoin * (Math.floor(Math.random() * 35) + 15)
                        userData[msg.author.id + msg.guild.id].money += bitcoinAmount;
                        msg.channel.send({embed: {
                                title: "Bitcoin Claim :pick:",
                                description: "+" + bitcoinAmount + "MM"
                            }})

                        bitcoinClaim.add(msg.author.id);
                            setTimeout(() => {
                        // Removes the user from the set after a minute
                            bitcoinClaim.delete(msg.author.id);
                        }, 3600000);
                    }
                }
                else
                {
                    msg.reply("Mosh up mon, you don't have a bitcoin mine")
                }
            }
            else if (toLower.includes(items[6]))
            {
                if (userData[msg.author.id + msg.guild.id].gamemon > 0)
                {
                    msg.channel.send({embed:{
                        title:"GameMon",
                        fields:[{
                            name:"Rock, Paper, Scissors :scissors: (1)",
                            value: "10 MM\n //Play a round of rock, paper, scissors",
                            inline: false
                        },
                        {
                            name:"RPG :crossed_swords: (2)",
                            value: "100 MM\n //Play the RPG until you die",
                            inline: false
                        }],
                    }
                    })
                }
            }
            else
            {
                msg.reply("That item doesn't exist, you mon")
            }
        }
        else if (toLower === (array[14]))
        {
            jevil = "./jevil.gif";
            msg.channel.send ({ files: [jevil] });

            ope = "./oh.mp3";
            msg.channel.send ({ files: [ope] });
        }
        else if (toLower === (array[15]))
        {
            msg.channel.send({embed:{
                title: msg.author.username + "'s Profile",
                fields:[{
                    name:"Lebanese Chicken :poultry_leg:",
                    value: "LV " + (userGrind[msg.author.id + msg.guild.id].grind - 1),
                    inline: true
                },
                {
                    name:"Baby Bottle :baby_bottle:",
                    value: "LV " + userData[msg.author.id + msg.guild.id].bottle,
                    inline: true
                },
                {
                    name:"Banana :banana:",
                    value: "LV " + (userData[msg.author.id + msg.guild.id].banana - 1),
                    inline: false
                },
                {
                    name:"Bitcoin Mine :computer:",
                    value: "LV " + userData[msg.author.id + msg.guild.id].bitcoin,
                    inline: false
                },
                {
                    name:"Rum and Coke :tumbler_glass:",
                    value: "LV " + userData[msg.author.id + msg.guild.id].rum,
                    inline: false
                }],
            }
            })
        }
        else
        {
            if (msg.author.bot)
            {
                return;
            }
            else
            {
                msg.reply("That's not a command, you monkey!");
            }
        }
    }
});
// No client key here
client.login(config.token);
