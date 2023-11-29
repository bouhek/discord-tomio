const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Jako nesouhlasim s tim že by měl dostat prostor někdo jiný, ale budiž.'),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (queue.node.isPaused())
            return interaction.followUp("Nic vám k tomu neřeknu.");

        queue.node.pause();

        return interaction.followUp("Nemám slov.");
    }
};