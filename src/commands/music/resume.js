const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the playback'),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (queue.node.isPlaying())
            return interaction.followUp("The playback is already playing.");

        queue.node.resume();

        return interaction.followUp("Resumed the playback.");
    }
};