require('dotenv').config();
const Discord = require('discord.js');
const {Octokit} = require('@octokit/rest');

const discord = new Discord.Client();
const octokit = new Octokit();

discord.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => discord.guilds.fetch('816975867481161728')
        .then(guild => octokit.repos.listForOrg({
            org: 'Astrotomic',
            type: 'public',
            per_page: 100,
        })
            .then(response => response.data)
            .then(repos => repos.filter(repo => !repo.archived))
            .then(repos => Promise.all(
                repos.map(repo => guild.channels.create(repo.name, {
                    type: 'text',
                    parent: '823538264941920297',
                    topic: repo.html_url,
                }))
            )))
    ).finally(() => discord.destroy());
