const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('No konečně mě necháte domluvit pani redaktorko!'),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (queue.node.isPlaying())
            return interaction.followUp("The playback is already playing.");

        queue.node.resume();

        return interaction.followUp("Resumed the playback.");
    }
};