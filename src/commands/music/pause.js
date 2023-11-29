const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the playback'),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (queue.node.isPaused())
            return interaction.followUp("The playback is already paused.");

        queue.node.pause();

        return interaction.followUp("Paused the playback.");
    }
};