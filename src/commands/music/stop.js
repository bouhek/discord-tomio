const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Kašlu na to, nic nebude, mam horečku 39!'),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        queue.delete();
        return interaction.followUp("Nazdar bazar.");
    }
};